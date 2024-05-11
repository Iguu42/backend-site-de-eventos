import { prisma } from "../db/prisma-client";
import { Asset, AssetCreate, AssetRepository, AssetUpdate, } from "../interfaces/asset.interface";

class AssetRepositoryPrisma implements AssetRepository{
    async createAsset(data: AssetCreate): Promise<Asset>{
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
    
    async deleteAsset(id: string): Promise<void>{
    try {
        await prisma.asset.delete({
            where:{
                id
            }
        });
    } catch (error) {
        throw new Error('Failed to delete asset');
    }}
    
    async updateAsset(data: AssetUpdate): Promise<Asset>{
    try {
        const result = await prisma.asset.update({
            where:{
                id: data.id
            },
            data:{
                type: data.type,
                url: data.url,
                description: data.description
            }
        });
        return result;
    } catch (error) {
        throw new Error('Failed to update asset');
    }}
    
    async getAllAssetsByEventId(eventId: string): Promise<Asset[]>{
    try {
        return await prisma.asset.findMany({
            where:{
                eventId
            }
        });
    } catch (error) {
        throw new Error('Unable to get all assets by event id');
    }}
    async getAssetById(id: string): Promise<Asset | null>{
    try {
        return await prisma.asset.findUnique({
            where:{
                id
            }
        });
    } catch (error) {
        throw new Error('Unable to get asset by id');
    }
}
}

export{ AssetRepositoryPrisma};