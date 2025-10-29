import { Injectable } from '@nestjs/common';
import { StorageStrategy } from './storage.strategy';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageStrategy implements StorageStrategy {
  private uploadPath = path.join(__dirname, '../../uploads');

  async upload(file: Express.Multer.File): Promise<string> {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }

    const filename = `${Date.now()}_${file.originalname}`
    const filePath = path.join(this.uploadPath, filename);
    await fs.promises.writeFile(filePath, file.buffer);

    return `local:uploads/${filename}`
  }

  async delete(fileUrl: string): Promise<void> {
    const filePath = path.join(this.uploadPath, path.basename(fileUrl));
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }

  async cleanup() {}
}
