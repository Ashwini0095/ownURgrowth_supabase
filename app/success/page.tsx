import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619]">
      <section className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-[#141619] mb-4">
            Payment Successful!
          </h1>
          <p className="text-[#2C2E3A] mb-8">
            Thank you for your purchase. You now have access to your course.
          </p>
          <div className="space-y-4">
            <Link
              href="/courses"
              className="block rounded-full bg-fuchsia-400 px-8 py-3 text-lg font-semibold text-slate-950 transition hover:bg-fuchsia-300"
            >
              Go to Courses
            </Link>
            <Link
              href="/"
              className="block text-[#2C2E3A] hover:text-[#141619]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
