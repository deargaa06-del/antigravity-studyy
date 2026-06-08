// src/services/firebase.js
// 실제 서비스 운영 시 Firebase 콘솔에서 발급받은 설정값을 여기에 입력합니다.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const IS_MOCK = firebaseConfig.apiKey === "YOUR_API_KEY";

// 테스트를 위해 Firebase 초기화를 건너뜁니다.
export const auth = {};
export const db = {};
