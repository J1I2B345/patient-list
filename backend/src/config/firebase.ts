import serviceAccount from '../../serviceAccountKey.json';

import * as admin from 'firebase-admin';
import { getStorage, Storage } from 'firebase-admin/storage';

const BUCKET_URL = 'gs://juanito-test.appspot.com';

let storage: Storage;
export function initializeFirebaseAdmin() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    storageBucket: BUCKET_URL,
  });
}

function getStorageInstance() {
  if (!storage) storage = getStorage();
  return storage;
}

export { getStorageInstance };
