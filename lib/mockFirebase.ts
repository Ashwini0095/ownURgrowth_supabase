// Temporary fix for quota exceeded
// Add this to your components that use Firebase

const MOCK_USER_PLAN = 'pro'; // Temporarily mock user as pro

// Replace Firebase calls with:
const checkUserPurchase = async (userId: string, plan: string) => {
  // Return mock data to avoid Firebase calls
  return MOCK_USER_PLAN;
};

export { checkUserPurchase };
