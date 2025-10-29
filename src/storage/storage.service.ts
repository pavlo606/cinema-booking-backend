import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StorageStrategy } from "./storage.strategy";
import { LocalStorageStrategy } from "./loacal-store.strategy";
import { FirebaseStorageStrategy } from "./firebase-store.strategy";

@Injectable()
export class StorageService implements OnModuleInit {
    private strategy: StorageStrategy;

    constructor(private config: ConfigService) {}

    onModuleInit() {
        const driver = this.config.get("storage.driver");

        if (driver === "firebase") {
            this.strategy = new FirebaseStorageStrategy();
        } else {
            this.strategy = new LocalStorageStrategy();
        }
    }

    async upload(file: Express.Multer.File) {
        return this.strategy.upload(file);
    }

    async delete(fileUrl: string) {
        try {
            if (
                this.strategy instanceof FirebaseStorageStrategy &&
                fileUrl.startsWith("local:")
            ) {
                const tmp_stategy = new LocalStorageStrategy();
                tmp_stategy.delete(fileUrl);
                await tmp_stategy.cleanup();
                return;
            }
            if (
                this.strategy instanceof LocalStorageStrategy &&
                fileUrl.startsWith("firebase:")
            ) {
                const tmp_stategy = new FirebaseStorageStrategy();
                tmp_stategy.delete(fileUrl);
                await tmp_stategy.cleanup();
                return;
            }
            return this.strategy.delete(fileUrl);
        } catch (err) {
            console.log("Faild to delete poster");
            console.error(err)
        }
    }
}
