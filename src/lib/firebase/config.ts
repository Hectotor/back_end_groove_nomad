import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialisation de Firebase
const app = initializeApp();

// Exportation de Firestore
export const db = getFirestore(app);
