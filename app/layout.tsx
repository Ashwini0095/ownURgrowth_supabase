import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../lib/AuthContext";
import Navigation from "../components/Navigation";
import LoginNudgePopup from "../components/LoginNudgePopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ownURgrowth - Personal Development & Professional Growth Courses",
  description: "Transform your career and life with ownURgrowth's practical courses. Learn skills for professional development, personal growth, and success.",
  icons: {
    icon: [{ url: "/vercel.png", type: "image/png" }],
  },
  keywords: "personal development, professional growth, online courses, career development, skill building, ownURgrowth",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <AuthProvider>
          <Navigation />
          <div className="pt-16">
            {children}
          </div>
          <LoginNudgePopup />
        </AuthProvider>
      </body>
    </html>
  );
}
