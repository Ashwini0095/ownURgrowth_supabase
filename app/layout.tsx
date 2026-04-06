import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ownURgrowth - Personal Development & Professional Growth Courses",
  description: "Transform your career and life with ownURgrowth's practical courses. Learn skills for professional development, personal growth, and success.",
  keywords: "personal development, professional growth, online courses, career development, skill building, ownURgrowth",
  viewport: "width=device-width, initial-scale=1",
  authors: [{ name: "ownURgrowth" }],
  creator: "ownURgrowth",
  publisher: "ownURgrowth",
  openGraph: {
    title: "ownURgrowth - Personal Development & Professional Growth Courses",
    description: "Transform your career and life with ownURgrowth's practical courses.",
    url: "https://ownurgrowth.com",
    siteName: "ownURgrowth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ownURgrowth - Personal Development & Professional Growth Courses",
    description: "Transform your career and life with ownURgrowth's practical courses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
