'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { User, CreditCard, History, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUserPaymentHistory, PaymentRecord } from '../../lib/payments';
import Navigation from '../../components/Navigation';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Personal info state
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Payment history state
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/profile');
      return;
    }
    
    if (user) {
      setDisplayName(user.displayName || '');
      
      // Load payment history
      setLoadingPayments(true);
      getUserPaymentHistory(user.uid)
        .then(setPaymentHistory)
        .catch(console.error)
        .finally(() => setLoadingPayments(false));
    }
  }, [user, loading, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    setError('');
    setMessage('');

    try {
      await updateProfile(user, {
        displayName: displayName
      });

      if (newPassword) {
        await updatePassword(user, newPassword);
        setCurrentPassword('');
        setNewPassword('');
      }

      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-[#141619]">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile Management</h1>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                activeTab === 'personal' 
                  ? 'bg-[#1D4ED8] text-white' 
                  : 'text-[#2C2E3A] hover:text-[#141619]'
              }`}
            >
              <User className="h-4 w-4" />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                activeTab === 'payments' 
                  ? 'bg-[#1D4ED8] text-white' 
                  : 'text-[#2C2E3A] hover:text-[#141619]'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Payment History
            </button>
          </div>

          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Personal Information
              </h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C2E3A] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-[#B3B4BD] cursor-not-allowed"
                  />
                  <p className="text-xs text-[#B3B4BD] mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C2E3A] mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-[#141619] focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your display name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2C2E3A] mb-2">
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-[#141619] focus:border-blue-500 focus:outline-none"
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-[#B3B4BD] mt-1">Leave blank to keep current password</p>
                </div>

                {message && (
                  <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-md">
                    <p className="text-green-400 text-sm">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={updating}
                  className="bg-[#1D4ED8] text-white px-6 py-2 rounded-md transition"
                >
                  {updating ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'payments' && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <History className="h-5 w-5" />
                Payment History
              </h2>
              
              {loadingPayments ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-[#B3B4BD]">Loading payment history...</p>
                </div>
              ) : paymentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-[#B3B4BD] mx-auto mb-4" />
                  <p className="text-[#B3B4BD]">No payment history found</p>
                  <p className="text-sm text-[#141619]0 mt-2">Your course purchases will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="bg-slate-700 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#141619]">{payment.course}</h3>
                        <p className="text-sm text-[#2C2E3A]">{payment.plan}</p>
                        <p className="text-xs text-[#B3B4BD]">{new Date(payment.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#141619]">₹{payment.amount}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          payment.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
