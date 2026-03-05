// Mock auth for development
export const mockAuth = {
  signUp: async (email: string, password: string, name: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user in localStorage for demo
    const user = { email, name, id: Date.now().toString() };
    localStorage.setItem('mockUser', JSON.stringify(user));
    
    return { user, error: null };
  },
  
  signIn: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { email, id: Date.now().toString() };
    localStorage.setItem('mockUser', JSON.stringify(user));
    
    return { user, error: null };
  },
  
  getUser: () => {
    const user = localStorage.getItem('mockUser');
    return user ? JSON.parse(user) : null;
  },
  
  signOut: () => {
    localStorage.removeItem('mockUser');
  }
};
