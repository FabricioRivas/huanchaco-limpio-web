import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'huanchaco-limpio.firebaseapp.com',
  databaseURL: 'https://huanchaco-limpio-default-rtdb.firebaseio.com',
  projectId: 'huanchaco-limpio',
  storageBucket: 'huanchaco-limpio.firebasestorage.app',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
