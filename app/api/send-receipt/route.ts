import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, name, courseName, plan, paymentId, amount } = await request.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Course Purchase Confirmation - ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Thank you for your purchase!</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Course Details:</h3>
            <p><strong>Course:</strong> ${courseName}</p>
            <p><strong>Plan:</strong> ${plan}</p>
            <p><strong>Amount Paid:</strong> ₹${amount}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
          </div>

          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Access Your Course:</h3>
            <p>Click the link below to access your course content:</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/courses/linkedin-growth/access?plan=${plan}" 
               style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Access Course
            </a>
          </div>

          <p style="color: #64748b; font-size: 14px;">
            You have lifetime access to this course. If you have any questions, reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
