import { Asset } from "@prisma/client";
import { AssetCreate, AssetRepository } from "../interfaces/asset.interface";
import S3Storage from "../utils/s3.utils";
import { File } from "fastify-multer/lib/interfaces";

class AssetUseCase {
    private assetRepository: AssetRepository;
    constructor(assetRepository: AssetRepository) {
        this.assetRepository = assetRepository;
    }
    async create(data: AssetCreate): Promise<Asset> {
        return await this.assetRepository.create(data);
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
}

export { AssetUseCase, UploadAssetUseCase };