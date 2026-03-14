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
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading...</p>
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
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">No Upgrades Available</h1>
            <p className="text-slate-300 mb-8">You already have the highest plan!</p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-400"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Upgrade Your Plan</h1>
          <p className="text-slate-300">Pay only the difference to upgrade your current plan</p>
        </div>

        <div className="space-y-4">
          {availableUpgrades.map((upgrade) => (
            <div
              key={upgrade.to}
              className={`cursor-pointer rounded-2xl border p-6 transition ${
                selectedUpgrade === upgrade.to
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/10 bg-slate-900/50 hover:border-white/20'
              }`}
              onClick={() => setSelectedUpgrade(upgrade.to)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{upgrade.name}</h3>
                  <p className="text-slate-300">Upgrade price: ₹{upgrade.price}</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 ${
                  selectedUpgrade === upgrade.to
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-white/30'
                }`}>
                  {selectedUpgrade === upgrade.to && (
                    <div className="h-full w-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleUpgrade}
            disabled={!selectedUpgrade}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300 disabled:shadow-none"
          >
            Pay Upgrade Fee
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default function UpgradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>}>
      <UpgradeContent />
    </Suspense>
  );
}
