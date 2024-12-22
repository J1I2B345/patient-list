import {
  ref,
  FirebaseStorage,
  uploadBytes,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage } from '../config/firebase';

export class StorageService {
  constructor(private storage: FirebaseStorage) {
    this.storage = storage;
  }
  async uploadFile(
    fileName: string,
    fileData: Blob | Uint8Array | ArrayBuffer
  ) {
    const storageRef = ref(this.storage, fileName);

    const snapshot = await uploadBytes(storageRef, fileData);

    console.log('Uploaded a blob or file!', snapshot);
  }
  async deleteFile(fileName: string) {
    // Create a reference to the file to delete
    const storageRef = ref(this.storage, fileName);

    // Delete the file
    const result = await deleteObject(storageRef);
    console.log('Deleted a file!', result);
  }
  async listFiles() {
    const storageRef = ref(this.storage, '/images');

    // TODO remove
    // Find all the prefixes and items.
    listAll(storageRef)
      .then((res) => {
        console.log(res);
        res.items.forEach((itemRef) => {
          // All the items under storageRef.
          console.log('itemRef', itemRef);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log('error', error);
      });
  }
}
export const storageService = new StorageService(storage);
