'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import { User, CreditCard, History, Settings, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUserPaymentHistory, PaymentRecord } from '../../lib/payments';

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Validate password confirmation
    if (newPassword && newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

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
        setConfirmPassword('');
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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#1D4ED8]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#0F172A]/3 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#B3B4BD]/10 rotate-45 blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D4ED8]/10 to-blue-100 px-6 py-3 rounded-full border border-[#1D4ED8]/20 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#1D4ED8] rounded-full animate-pulse"></div>
              <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">Account Settings</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl mb-6">
              <span className="text-[#141619]">Profile</span>{" "}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent font-black">
                Management
              </span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#1E40AF] mx-auto rounded-full"></div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-12 bg-white/80 backdrop-blur-sm p-2 rounded-2xl border border-[#B3B4BD]/20 shadow-lg">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-medium ${
                activeTab === 'personal' 
                  ? 'bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] text-white shadow-lg shadow-[#1D4ED8]/30' 
                  : 'text-[#2C2E3A] hover:text-[#1D4ED8] hover:bg-blue-50/50'
              }`}
            >
              <User className="h-5 w-5" />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-medium ${
                activeTab === 'payments' 
                  ? 'bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] text-white shadow-lg shadow-[#1D4ED8]/30' 
                  : 'text-[#2C2E3A] hover:text-[#1D4ED8] hover:bg-blue-50/50'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              Payment History
            </button>
          </div>

          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#141619]">
                <div className="h-10 w-10 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-[#1D4ED8]" />
                </div>
                Personal Information
              </h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-[#141619] mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-4 bg-gray-100 border-2 border-gray-200 rounded-2xl text-[#2C2E3A] cursor-not-allowed font-medium"
                  />
                  <p className="text-sm text-[#B3B4BD] mt-2 font-medium">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#141619] mb-3">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-4 bg-white border-2 border-[#B3B4BD]/30 rounded-2xl text-[#141619] focus:border-[#1D4ED8] focus:outline-none transition-colors font-medium"
                    placeholder="Enter your display name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#141619] mb-3">
                    New Password (optional)
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-4 pr-12 bg-white border-2 border-[#B3B4BD]/30 rounded-2xl text-[#141619] focus:border-[#1D4ED8] focus:outline-none transition-colors font-medium"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B4BD] hover:text-[#1D4ED8] transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-sm text-[#B3B4BD] mt-2 font-medium">Leave blank to keep current password</p>
                </div>

                {newPassword && (
                  <div>
                    <label className="block text-sm font-semibold text-[#141619] mb-3">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-4 pr-12 bg-white border-2 border-[#B3B4BD]/30 rounded-2xl text-[#141619] focus:border-[#1D4ED8] focus:outline-none transition-colors font-medium"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B4BD] hover:text-[#1D4ED8] transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {newPassword !== confirmPassword && confirmPassword && (
                      <p className="text-sm text-red-600 mt-2 font-medium">Passwords do not match</p>
                    )}
                  </div>
                )}

                {message && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl">
                    <p className="text-green-700 font-medium">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl">
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={updating}
                  className="group relative overflow-hidden bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#1D4ED8]/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 rounded-2xl"
                >
                  <span className="relative z-10">
                    {updating ? 'Updating...' : 'Update Profile'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>
              </form>
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'payments' && (
            <div className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#141619]">
                <div className="h-10 w-10 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
                  <History className="h-5 w-5 text-[#1D4ED8]" />
                </div>
                Payment History
              </h2>
              
              {loadingPayments ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1D4ED8]/20 border-t-[#1D4ED8] mx-auto mb-6"></div>
                  <p className="text-[#2C2E3A] font-medium">Loading payment history...</p>
                </div>
              ) : paymentHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-[#B3B4BD]/20 flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="h-8 w-8 text-[#B3B4BD]" />
                  </div>
                  <p className="text-[#2C2E3A] font-medium text-lg">No payment history found</p>
                  <p className="text-[#B3B4BD] mt-2">Your purchases will appear here once you make a payment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="bg-gradient-to-br from-white/95 to-blue-50/30 border-2 border-[#1D4ED8]/20 rounded-3xl p-6 hover:shadow-xl hover:shadow-[#1D4ED8]/10 transition-all duration-300 transform hover:scale-[1.02]">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-[#1D4ED8]/20 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-[#1D4ED8]" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-[#141619]">{payment.course}</h3>
                              <p className="text-[#2C2E3A] font-medium">{payment.plan}</p>
                            </div>
                          </div>
                          <p className="text-[#B3B4BD] font-medium ml-13">{new Date(payment.date).toLocaleDateString('en-GB')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold bg-gradient-to-r from-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent mb-2">
                            ₹{payment.amount}
                          </p>
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300">
                            ✓ Completed
                          </span>
                        </div>
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
