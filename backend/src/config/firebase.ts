import serviceAccount from '../../serviceAccountKey.json';

import * as admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

const BUCKET_URL = 'gs://juanito-test.appspot.com';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    storageBucket: BUCKET_URL,
  });
} catch (error: any) {
  console.log('Firebase admin initialization error', error.stack);
}

const storage = getStorage();

export { storage };
