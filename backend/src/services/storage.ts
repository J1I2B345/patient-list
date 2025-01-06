import { Storage } from 'firebase-admin/storage';
import { getStorageInstance } from '../config/firebase';
import { logError } from '../utils/logger';

export class StorageService {
  private static instance: StorageService | null = null;

  constructor(private storage: Storage) {
    this.storage = storage;
  }
  static getInstance() {
    if (!StorageService.instance)
      StorageService.instance = new StorageService(getStorageInstance());
    return StorageService.instance;
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = file.filename || new Date().getTime().toString();
    const blob = this.storage.bucket().file(`images/${fileName}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise<string>((resolve, reject) => {
      blobStream.on('error', (err) => {
        logError('Error uploading file.', { error: err.message });
        reject(new Error('Error uploading file.'));
      });

      blobStream.on('finish', async () => {
        return resolve(fileName);
      });

      blobStream.end(file.buffer);
    });
  }

  async getDownloadUrl(fileName: string) {
    const url = await this.storage
      .bucket()
      .file(`images/${fileName}`)
      .getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    return url[0];
  }

  async deleteFile(fileName: string) {
    try {
      await this.storage.bucket().file(`images/${fileName}`).delete();
    } catch (error) {
      console.error('Error deleting file', error);
    }
  }
}
