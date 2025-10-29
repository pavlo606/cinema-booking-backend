import { Injectable } from '@nestjs/common';
import { StorageStrategy } from './storage.strategy';
import { initializeApp, cert, App, deleteApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import * as path from 'path';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseStorageStrategy implements StorageStrategy {
  private bucket: Bucket;
  private app: App;

  constructor() {
    if (!this.bucket) {
      const serviceAccountPath = path.join(__dirname, '../../firebase-key.json');
      this.app = initializeApp({
        credential: cert(serviceAccountPath),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
      this.bucket = getStorage(this.app).bucket();
      }
    
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const fileName = `images/${Date.now()}_${file.originalname}`;
    const fileRef = this.bucket.file(fileName);

    await fileRef.save(file.buffer, {
      metadata: { contentType: file.mimetype },
      public: true,
    });

    return `firebase:${this.bucket.name}/${fileName}`
  }

  async delete(fileUrl: string): Promise<void> {
    const fileName = `images/${path.basename(fileUrl)}`;
    await this.bucket.file(fileName).delete().catch(() => {});
  }

  async cleanup() {
    await deleteApp(this.app)
  }
}
