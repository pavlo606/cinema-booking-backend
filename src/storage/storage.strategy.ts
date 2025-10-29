export interface StorageStrategy {
  upload(file: Express.Multer.File): Promise<string>;
  delete(fileUrl: string): Promise<void>;
  cleanup(): Promise<void>;
}