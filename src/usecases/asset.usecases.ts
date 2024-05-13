import { Asset } from "@prisma/client";
import { AssetCreate, AssetRepository, AssetUpdate } from "../interfaces/asset.interface";
import S3Storage from "../utils/s3.utils";
import { File } from "fastify-multer/lib/interfaces";

class AssetUseCase {
    private assetRepository: AssetRepository;
    constructor(assetRepository: AssetRepository) {
        this.assetRepository = assetRepository;
    }
    async create(data: AssetCreate): Promise<Asset> {
        return await this.assetRepository.createAsset(data);
    }

    async delete(id: string): Promise<void> {
        await this.assetRepository.deleteAsset(id);
    };

    async update(data: AssetUpdate): Promise<AssetUpdate> {
        return await this.assetRepository.updateAsset(data);
    }

    async getAllAssetsByEventId(eventId: string): Promise<Asset[]> {
        return await this.assetRepository.getAllAssetsByEventId(eventId);
    }

    async getAssetById(id: string): Promise<Asset | null> {
        return await this.assetRepository.getAssetById(id);
    }
}

class UploadAssetUseCase {
    async execute(file: File): Promise<any> { 
        if (!file.filename) {
            throw new Error('File name is undefined');
        }
        const s3Storage = new S3Storage();
        await s3Storage.saveFile(file.filename);
    }
    async delete(file: string): Promise<void> {
        const s3Storage = new S3Storage();
        await s3Storage.deleteFile(file);
    }
}

export { AssetUseCase, UploadAssetUseCase };