import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseClient";
import {
  canDownloadLinkedInGrowthNotes,
  createLinkedInGrowthPaymentLookup,
  getLinkedInGrowthPlanForUser,
} from "@/lib/linkedinGrowthAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTES_FILE_PATH = path.join(
  process.cwd(),
  "protected-assets",
  "linkedin-course-notes.pdf",
);

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Course notes download auth failed:", authError?.message);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const plan = await getLinkedInGrowthPlanForUser(
      createLinkedInGrowthPaymentLookup(supabase),
      user.id,
      user.email,
    );

    if (!canDownloadLinkedInGrowthNotes(plan)) {
      return NextResponse.json(
        { error: "Course notes PDF is available only to Pro and Master Program users." },
        { status: 403 },
      );
    }

    const file = await readFile(NOTES_FILE_PATH);
    const body = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);

    return new NextResponse(body, {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": 'attachment; filename="linkedin-course-notes.pdf"',
        "Content-Length": file.byteLength.toString(),
        "Content-Type": "application/pdf",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Course notes download failed:", error);
    return NextResponse.json({ error: "Unable to download course notes." }, { status: 500 });
  }
}
