import fs from 'fs';
import * as admin from 'firebase-admin';
import { getStorage, Storage } from 'firebase-admin/storage';

const BUCKET_URL = 'gs://juanito-test.appspot.com';

const serviceAccountPath = '/app/secrets/serviceAccountKey.json';
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

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
