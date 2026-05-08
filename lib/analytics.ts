import { logEvent, setUserId, setUserProperties, Analytics } from 'firebase/analytics';
import { analytics as analyticsPromise } from './firebase';

let _analytics: Analytics | null = null;

// Resolve the analytics promise once
async function getAnalytics(): Promise<Analytics | null> {
  if (_analytics) return _analytics;
  if (analyticsPromise) {
    _analytics = await analyticsPromise;
  }
  return _analytics;
}

export const trackEvent = async (eventName: string, parameters?: Record<string, any>) => {
  const a = await getAnalytics();
  if (a) logEvent(a, eventName, parameters);
};

// Set user identity for analytics
export const setAnalyticsUser = async (userId: string, email?: string, name?: string) => {
  const a = await getAnalytics();
  if (a) {
    setUserId(a, userId);
    setUserProperties(a, {
      email: email || '',
      display_name: name || '',
    });
  }
};

// Predefined tracking functions
export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_title: pageName });
};

export const trackLogin = (method: string = 'email') => {
  trackEvent('login', { method });
};

export const trackSignUp = (method: string = 'email') => {
  trackEvent('sign_up', { method });
};

export const trackCourseView = (courseId: string, courseName: string) => {
  trackEvent('select_content', {
    content_type: 'course',
    content_id: courseId,
    item_name: courseName,
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('select_content', {
    content_type: 'button',
    item_name: buttonName,
    location,
  });
};
