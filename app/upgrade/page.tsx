'use client';

import { ChevronRight } from "lucide-react";
import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";

const plans = [
  { id: "basic", name: "Core Course", price: 499 },
  { id: "plus", name: "Course + Notes", price: 799 },
  { id: "pro", name: "Course + Notes + Live Q&A", price: 999 },
];

const upgradePaths = {
  basic: [
    { to: "plus", name: "Course + Notes", price: 300 },
    { to: "pro", name: "Course + Notes + Live Q&A", price: 500 },
  ],
  plus: [
    { to: "pro", name: "Course + Notes + Live Q&A", price: 200 },
  ],
  pro: [],
};

function UpgradeContent() {
  const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const currentPlan = searchParams.get('from') || 'basic';

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/upgrade?from=${currentPlan}`);
    }
  }, [user, loading, router, currentPlan]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619]">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-[#2C2E3A]">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const availableUpgrades = upgradePaths[currentPlan as keyof typeof upgradePaths] || [];

  console.log('Current plan:', currentPlan);
  console.log('Available upgrades:', availableUpgrades);

  const handleUpgrade = async () => {
    if (!selectedUpgrade) return;
    
    const upgradeOption = availableUpgrades.find(upgrade => upgrade.to === selectedUpgrade);
    if (!upgradeOption) return;

    console.log('Upgrade option:', upgradeOption);
    console.log('Current plan:', currentPlan);
    console.log('Selected upgrade:', selectedUpgrade);
    console.log('Upgrade price:', upgradeOption.price);

    try {
      console.log('Making API request...');
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: 'linkedin-growth-upgrade',
          courseName: `Upgrade to ${upgradeOption.name}`,
          price: upgradeOption.price,
        }),
      });

      console.log('Response received:', response);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        console.error('API Error:', responseData);
        throw new Error(responseData.error || 'Payment failed');
      }

      const { orderId, amount, currency, key } = responseData;

      console.log('Razorpay response:', { orderId, amount, currency, key });

      const options = {
        key: key,
        amount,
        currency,
        name: 'ownURgrowth',
        description: `Upgrade to ${upgradeOption.name}`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment and send receipt
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userEmail: user?.email,
                userName: user?.displayName || user?.email,
                courseName: `Upgrade to ${upgradeOption.name}`,
                plan: upgradeOption.name,
                amount: amount,
                userId: user?.uid,
              }),
            });

            if (verifyResponse.ok) {
              router.push(`/courses/linkedin-growth/access?plan=${selectedUpgrade}&upgraded=true&payment_id=${response.razorpay_payment_id}`);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.displayName || '',
          email: user?.email || '',
          contact: '',
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Upgrade payment error:', error);
      alert('Upgrade failed. Please try again.');
    }
  };

  if (availableUpgrades.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619]">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">No Upgrades Available</h1>
            <p className="text-[#2C2E3A] mb-8">You already have the highest plan!</p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] text-white hover:bg-blue-400 px-6 py-3"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#1D4ED8]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#0F172A]/3 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#B3B4BD]/10 rotate-45 blur-xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-6 py-3 rounded-full border border-[#1D4ED8]/20 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
            <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">Plan Upgrade</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl mb-6">
            <span className="text-[#141619]">Upgrade Your</span>{" "}
            <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent font-black">
              Plan
            </span>
          </h1>
          <p className="text-xl text-[#2C2E3A] sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Pay only the difference to upgrade your current plan and unlock additional features
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="space-y-6 mb-12">
          {availableUpgrades.map((upgrade) => (
            <div
              key={upgrade.to}
              className={`cursor-pointer rounded-3xl border-2 p-8 transition-all duration-300 transform hover:scale-[1.02] ${
                selectedUpgrade === upgrade.to
                  ? 'border-[#1D4ED8] bg-gradient-to-br from-blue-50/80 to-blue-100/40 shadow-xl shadow-[#1D4ED8]/20'
                  : 'border-[#B3B4BD]/20 bg-white/90 hover:border-[#1D4ED8]/30 hover:shadow-lg backdrop-blur-sm'
              }`}
              onClick={() => setSelectedUpgrade(upgrade.to)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#141619] mb-2">{upgrade.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-[#2C2E3A]">Upgrade price:</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">
                      ₹{upgrade.price}
                    </span>
                  </div>
                </div>
                <div className={`relative h-8 w-8 rounded-full border-3 transition-all duration-300 ${
                  selectedUpgrade === upgrade.to
                    ? 'border-[#1D4ED8] bg-[#1D4ED8] shadow-lg shadow-[#1D4ED8]/30'
                    : 'border-[#B3B4BD]/40 bg-white'
                }`}>
                  {selectedUpgrade === upgrade.to && (
                    <div className="absolute inset-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleUpgrade}
            disabled={!selectedUpgrade}
            className="group relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-12 py-6 text-xl font-bold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-lg rounded-2xl"
          >
            <span className="relative z-10 flex items-center gap-3">
              Pay Upgrade Fee
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </button>
          
          {!selectedUpgrade && (
            <p className="text-[#2C2E3A] text-sm mt-4 opacity-70">
              Please select an upgrade option to continue
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619] flex items-center justify-center">Loading...</div>}>
      <UpgradeContent />
    </Suspense>
  );
}
