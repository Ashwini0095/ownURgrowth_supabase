import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - ownURgrowth',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: white; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #3B82F6; font-size: 28px; margin: 0;">ownURgrowth</h1>
            <p style="color: #94a3b8; margin: 10px 0 0 0;">Grow Your Professional Network</p>
          </div>
          
          <div style="background: #1e293b; padding: 30px; border-radius: 12px; text-align: center;">
            <h2 style="color: white; margin: 0 0 20px 0;">Welcome ${name}!</h2>
            <p style="color: #cbd5e1; margin: 0 0 30px 0; line-height: 1.6;">
              Thank you for joining ownURgrowth! To complete your registration and access your courses, 
              please verify your email address by clicking the button below.
            </p>
            
            <div style="margin: 30px 0;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0 0 15px 0;">
                Click the button below to verify your email:
              </p>
              <a href="https://asrocourse.firebaseapp.com/__/auth/action?mode=verifyEmail&oobCode=PLACEHOLDER&apiKey=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}" 
                 style="background: linear-gradient(135deg, #3B82F6, #1d4ed8); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                ✅ Verify Email Address
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">
                If the button doesn't work, you should also receive a verification email from Firebase. 
                Check your spam folder if you don't see it.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              If you didn't create an account with ownURgrowth, please ignore this email.
            </p>
            <p style="color: #64748b; font-size: 12px; margin: 10px 0 0 0;">
              © 2025 ownURgrowth. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // In a real app, you'd store the token in database
    // For now, we'll just return success
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}
