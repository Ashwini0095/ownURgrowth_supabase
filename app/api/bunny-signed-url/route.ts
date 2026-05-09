import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseClient";
import { rateLimit } from "@/lib/rateLimit";
import {
  createLinkedInGrowthPaymentLookup,
  getLinkedInGrowthPlanForUser,
} from "@/lib/linkedinGrowthAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_TTL_SECONDS = 5 * 60;

function getAllowedVideoIds(defaultVideoId: string) {
  const configuredIds = (process.env.BUNNY_STREAM_ALLOWED_VIDEO_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return new Set([defaultVideoId, ...configuredIds]);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = rateLimit(`bunny-signed-url:${ip}`, 30, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const libraryId =
      process.env.BUNNY_STREAM_LIBRARY_ID || process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
    const defaultVideoId =
      process.env.BUNNY_STREAM_VIDEO_ID || process.env.NEXT_PUBLIC_BUNNY_VIDEO_ID;
    const tokenSecurityKey = process.env.BUNNY_STREAM_TOKEN_SECURITY_KEY;

    if (!libraryId || !defaultVideoId) {
      console.error("Bunny Stream embed is not configured");
      return NextResponse.json({ error: "Video streaming is not configured" }, { status: 500 });
    }

    if (!tokenSecurityKey) {
      console.error("Bunny Stream token auth is not configured");
      return NextResponse.json({ error: "Video streaming is not configured" }, { status: 500 });
    }

    const body = (await request.json().catch(() => ({}))) as { videoId?: unknown };
    const requestedVideoId =
      typeof body.videoId === "string" && body.videoId.trim()
        ? body.videoId.trim()
        : defaultVideoId;

    if (!getAllowedVideoIds(defaultVideoId).has(requestedVideoId)) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const supabase = getSupabaseAdmin();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Bunny signed URL auth failed:", authError?.message);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plan = await getLinkedInGrowthPlanForUser(
      createLinkedInGrowthPaymentLookup(supabase),
      user.id,
      user.email,
    );

    if (!plan) {
      return NextResponse.json({ error: "Course access required" }, { status: 403 });
    }

    const embedUrl = new URL(
      `https://iframe.mediadelivery.net/embed/${libraryId}/${requestedVideoId}`,
    );
    const expires = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
    const signedToken = crypto
      .createHash("sha256")
      .update(`${tokenSecurityKey}${requestedVideoId}${expires}`)
      .digest("hex");
    embedUrl.searchParams.set("token", signedToken);
    embedUrl.searchParams.set("expires", String(expires));
    embedUrl.searchParams.set("autoplay", "false");
    embedUrl.searchParams.set("preload", "true");
    embedUrl.searchParams.set("responsive", "true");

    return NextResponse.json(
      {
        embedUrl: embedUrl.toString(),
        expiresAt: expires * 1000,
        watermarkEmail: user.email ?? null,
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch (error) {
    console.error("Bunny signed URL generation failed:", error);
    return NextResponse.json({ error: "Unable to load secure video" }, { status: 500 });
  }
}
