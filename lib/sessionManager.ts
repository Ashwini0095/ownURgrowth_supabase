import { db } from './firebase';
import { collection, doc, setDoc, getDocs, query, where, deleteDoc, serverTimestamp } from 'firebase/firestore';

export interface UserSession {
  id: string;
  userId: string;
  deviceInfo: string;
  loginTime: any;
  lastActivity: any;
}

export async function createUserSession(userId: string): Promise<boolean> {
  try {
    // Generate unique session ID
    const sessionId = `${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get device info
    const deviceInfo = `${navigator.userAgent.substring(0, 100)} - ${new Date().toISOString()}`;
    
    // Check existing sessions
    const sessionsRef = collection(db, 'userSessions');
    const q = query(sessionsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const activeSessions = querySnapshot.docs.filter(doc => {
      const data = doc.data();
      const lastActivity = data.lastActivity?.toDate?.() || new Date(0);
      const now = new Date();
      // Consider session active if last activity was within 30 minutes
      return (now.getTime() - lastActivity.getTime()) < 30 * 60 * 1000;
    });
    
    // If 2 or more active sessions, remove oldest
    if (activeSessions.length >= 2) {
      const oldestSession = activeSessions.sort((a, b) => {
        const aTime = a.data().lastActivity?.toDate?.() || new Date(0);
        const bTime = b.data().lastActivity?.toDate?.() || new Date(0);
        return aTime.getTime() - bTime.getTime();
      })[0];
      
      await deleteDoc(doc(db, 'userSessions', oldestSession.id));
    }
    
    // Create new session
    await setDoc(doc(db, 'userSessions', sessionId), {
      userId,
      deviceInfo,
      loginTime: serverTimestamp(),
      lastActivity: serverTimestamp(),
    });
    
    // Store session ID locally
    localStorage.setItem('sessionId', sessionId);
    
    return true;
  } catch (error) {
    console.error('Error creating user session:', error);
    return false;
  }
}

export async function updateSessionActivity(userId: string): Promise<void> {
  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;
    
    await setDoc(doc(db, 'userSessions', sessionId), {
      userId,
      lastActivity: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating session activity:', error);
  }
}

export async function removeUserSession(): Promise<void> {
  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;
    
    await deleteDoc(doc(db, 'userSessions', sessionId));
    localStorage.removeItem('sessionId');
  } catch (error) {
    console.error('Error removing user session:', error);
  }
}

export async function checkSessionValidity(userId: string): Promise<boolean> {
  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return false;
    
    const sessionDoc = await getDocs(query(
      collection(db, 'userSessions'),
      where('userId', '==', userId)
    ));
    
    return sessionDoc.docs.some(doc => doc.id === sessionId);
  } catch (error) {
    console.error('Error checking session validity:', error);
    return false;
  }
}
