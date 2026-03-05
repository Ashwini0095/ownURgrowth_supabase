import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { analytics } from './firebase';

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

// Set user identity for analytics
export const setAnalyticsUser = (userId: string, email?: string, name?: string) => {
  if (analytics) {
    setUserId(analytics, userId);
    setUserProperties(analytics, {
      email: email || '',
      display_name: name || ''
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
    item_name: courseName
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('select_content', {
    content_type: 'button',
    item_name: buttonName,
    location
  });
};
