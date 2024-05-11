import { prisma } from "../db/prisma-client";
import { Asset, AssetCreate, AssetRepository } from "../interfaces/asset.interface";

class AssetRepositoryPrisma implements AssetRepository{
    async create(data: AssetCreate): Promise<Asset>{
        try {
            return await prisma.asset.create({
                data:{
                    eventId: data.eventId,
                    type: data.type,
                    url: data.url,
                    description: data.description
                }
            })
        } catch (error) {
            throw new Error('Unable to create asset');
        }
    }
}

export{ AssetRepositoryPrisma};