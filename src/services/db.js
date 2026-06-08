// src/services/db.js
import { IS_MOCK } from './firebase';

// Mock DB using LocalStorage for UI demonstration
export const loginUser = async (email, password, role) => {
  if (IS_MOCK) {
    const user = { uid: Date.now().toString(), email, role };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logoutUser = () => {
  if (IS_MOCK) {
    localStorage.removeItem('currentUser');
  }
};

export const getCurrentUser = () => {
  if (IS_MOCK) {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const saveActivity = async (data) => {
  if (IS_MOCK) {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const newActivity = { ...data, id: Date.now().toString(), status: '대기중' };
    activities.push(newActivity);
    localStorage.setItem('activities', JSON.stringify(activities));
    return newActivity;
  }
};

export const getActivities = async () => {
  if (IS_MOCK) {
    return JSON.parse(localStorage.getItem('activities') || '[]');
  }
  return [];
};

export const updateActivityStatus = async (id, status, aiText = null) => {
  if (IS_MOCK) {
    const activities = await getActivities();
    const index = activities.findIndex(a => a.id === id);
    if (index > -1) {
      activities[index].status = status;
      if (aiText) activities[index].aiText = aiText;
      localStorage.setItem('activities', JSON.stringify(activities));
    }
  }
};
