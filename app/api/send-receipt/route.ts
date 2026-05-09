import { NextRequest, NextResponse } from 'next/server';
import { getUserDisplayName } from '@/lib/userDisplayName';
import { getEmailTransporter, getEmailUser } from '@/lib/emailTransport';

const PLAN_NAME_TO_ID: Record<string, string> = {
  'Basic Crash Course': 'basic',
  'Pro Program': 'plus',
  'Master Program': 'pro',
};

const BRAND_NAME = 'ownURgrowth';
const SUPPORT_EMAIL = process.env.EMAIL_USER || 'support@ownurgrowth.com';

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type ReceiptBody = {
  email?: string;
  name?: string;
  courseName?: string;
  plan?: string;
  paymentId?: string;
  amount?: number | string;
  isUpgrade?: boolean;
};

function renderEmail(body: ReceiptBody) {
  const courseName = body.courseName || 'Grow on LinkedIn';
  const planId = PLAN_NAME_TO_ID[body.plan || ''] || body.plan || '';

  const displayName = getUserDisplayName(null, body.name);
  const safeName = escapeHtml(displayName || 'there');
  const safeCourseName = escapeHtml(courseName);
  const safePlan = escapeHtml(body.plan || '—');
  const safePaymentId = escapeHtml(body.paymentId || '—');
  const safeAmount = escapeHtml(String(body.amount ?? '0'));
  const safePlanId = encodeURIComponent(planId);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const accessUrl = `${baseUrl}/courses/linkedin-growth/access?plan=${safePlanId}`;

  const isUpgrade = !!body.isUpgrade;

  const subject = isUpgrade
    ? `Plan upgraded: you're now on ${body.plan ?? safePlan}`
    : `You're in — welcome to ${courseName}`;

  const preheader = isUpgrade
    ? `Your ${courseName} plan was upgraded successfully. Jump back in.`
    : `Your ${courseName} purchase is confirmed. Start learning now.`;

  const eyebrow = isUpgrade ? 'PLAN UPGRADED' : 'PAYMENT CONFIRMED';
  const heading = isUpgrade
    ? 'You just unlocked more.'
    : 'Welcome aboard, ready to grow?';
  const intro = isUpgrade
    ? `Hey ${safeName} — your <strong>${safeCourseName}</strong> plan has been upgraded to <strong>${safePlan}</strong>. The new modules and benefits are unlocked and waiting in your dashboard.`
    : `Hey ${safeName} — thanks for joining <strong>${safeCourseName}</strong>. You now have lifetime access to every module, update, and bonus that comes with your plan.`;
  const ctaLabel = isUpgrade ? 'Continue Learning →' : 'Start Learning →';
  const detailsTitle = isUpgrade ? 'Upgrade summary' : 'Order summary';
  const accentColor = '#1D4ED8';
  const accentColorDark = '#0F172A';

  // Email-safe HTML: tables for layout, inline styles, web-safe fonts.
  // Targets Outlook, Gmail, Apple Mail, Yahoo, Titan webmail.
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>${escapeHtml(subject)}</title>
    <style>
      @media only screen and (max-width: 620px) {
        .container { width: 100% !important; }
        .px { padding-left: 24px !important; padding-right: 24px !important; }
        .h1 { font-size: 26px !important; line-height: 32px !important; }
        .cta { display: block !important; width: 100% !important; box-sizing: border-box; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#0f172a;">
    <!-- Preheader (hidden, shown as preview text in inbox) -->
    <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1f5f9" style="background-color:#f1f5f9;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 1px 2px rgba(15,23,42,0.05);">

            <!-- Brand bar -->
            <tr>
              <td style="background:linear-gradient(135deg, ${accentColor} 0%, ${accentColorDark} 100%); padding:28px 40px; color:#ffffff;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="font-size:18px; font-weight:700; letter-spacing:-0.01em; color:#ffffff;">
                      ${escapeHtml(BRAND_NAME)}
                    </td>
                    <td align="right" style="font-size:11px; font-weight:700; letter-spacing:0.12em; color:rgba(255,255,255,0.85); text-transform:uppercase;">
                      ${escapeHtml(eyebrow)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Hero -->
            <tr>
              <td class="px" style="padding:40px 40px 8px 40px;">
                <h1 class="h1" style="margin:0 0 16px 0; font-size:30px; line-height:36px; font-weight:800; letter-spacing:-0.02em; color:#0f172a;">
                  ${escapeHtml(heading)}
                </h1>
                <p style="margin:0; font-size:16px; line-height:24px; color:#475569;">
                  ${intro}
                </p>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td class="px" align="left" style="padding:24px 40px 8px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td bgcolor="${accentColor}" style="border-radius:10px;">
                      <a href="${accessUrl}" class="cta" style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:10px; background-color:${accentColor};">
                        ${escapeHtml(ctaLabel)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Order summary -->
            <tr>
              <td class="px" style="padding:32px 40px 8px 40px;">
                <p style="margin:0 0 12px 0; font-size:11px; font-weight:700; letter-spacing:0.12em; color:#64748b; text-transform:uppercase;">
                  ${escapeHtml(detailsTitle)}
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
                  <tr>
                    <td style="padding:14px 20px; font-size:14px; color:#64748b; border-bottom:1px solid #e2e8f0;">Course</td>
                    <td align="right" style="padding:14px 20px; font-size:14px; font-weight:600; color:#0f172a; border-bottom:1px solid #e2e8f0;">${safeCourseName}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px; font-size:14px; color:#64748b; border-bottom:1px solid #e2e8f0;">Plan</td>
                    <td align="right" style="padding:14px 20px; font-size:14px; font-weight:600; color:#0f172a; border-bottom:1px solid #e2e8f0;">${safePlan}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px; font-size:14px; color:#64748b; border-bottom:1px solid #e2e8f0;">Amount paid</td>
                    <td align="right" style="padding:14px 20px; font-size:14px; font-weight:600; color:#0f172a; border-bottom:1px solid #e2e8f0;">₹${safeAmount}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 20px; font-size:14px; color:#64748b;">Payment ID</td>
                    <td align="right" style="padding:14px 20px; font-size:13px; font-family:'SF Mono',Menlo,Consolas,monospace; color:#0f172a; word-break:break-all;">${safePaymentId}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- What's next -->
            <tr>
              <td class="px" style="padding:32px 40px 8px 40px;">
                <p style="margin:0 0 12px 0; font-size:11px; font-weight:700; letter-spacing:0.12em; color:#64748b; text-transform:uppercase;">
                  What's next
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:8px 0; font-size:14px; line-height:22px; color:#334155;">
                      ✓ Lifetime access — return anytime, no expiry.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-size:14px; line-height:22px; color:#334155;">
                      ✓ Future updates included at no extra cost.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0; font-size:14px; line-height:22px; color:#334155;">
                      ✓ Reply to this email if you ever get stuck — I read every one.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td class="px" style="padding:24px 40px 0 40px;">
                <div style="height:1px; background-color:#e2e8f0; line-height:1px; font-size:1px;">&nbsp;</div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="px" style="padding:20px 40px 32px 40px;">
                <p style="margin:0 0 6px 0; font-size:13px; color:#64748b; line-height:20px;">
                  Need help? Just reply to this email or write to
                  <a href="mailto:${escapeHtml(SUPPORT_EMAIL)}" style="color:${accentColor}; text-decoration:none;">${escapeHtml(SUPPORT_EMAIL)}</a>.
                </p>
                <p style="margin:0; font-size:12px; color:#94a3b8; line-height:18px;">
                  Sent by ${escapeHtml(BRAND_NAME)} · This receipt is for your records.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  // Plain-text fallback (some clients render this; spam scores prefer both).
  const text = [
    isUpgrade
      ? `Plan upgraded — welcome to ${body.plan ?? ''} on ${courseName}.`
      : `Welcome to ${courseName}!`,
    '',
    isUpgrade
      ? `Hey ${displayName || 'there'}, your ${courseName} plan has been upgraded to ${body.plan ?? ''}. The new content is unlocked.`
      : `Hey ${displayName || 'there'}, thanks for joining ${courseName}. You now have lifetime access.`,
    '',
    `${detailsTitle}:`,
    `  Course:      ${courseName}`,
    `  Plan:        ${body.plan ?? '—'}`,
    `  Amount paid: ₹${body.amount ?? '0'}`,
    `  Payment ID:  ${body.paymentId ?? '—'}`,
    '',
    `Open your course: ${accessUrl}`,
    '',
    `Need help? Reply to this email or write to ${SUPPORT_EMAIL}.`,
    `— ${BRAND_NAME}`,
  ].join('\n');

  return { subject, html, text };
}

export async function POST(request: NextRequest) {
  try {
    const internalSecret = process.env.INTERNAL_API_SECRET;
    const providedSecret = request.headers.get('x-internal-api-secret');

    if (!internalSecret || providedSecret !== internalSecret) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const body = (await request.json()) as ReceiptBody;
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const transporter = getEmailTransporter();
    const fromEmail = getEmailUser();
    const { subject, html, text } = renderEmail(body);

    await transporter.sendMail({
      from: `"${BRAND_NAME}" <${fromEmail}>`,
      to: email,
      subject,
      html,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
