export interface Asset { 
    id: string; 
    eventId: string;
    type: string;
    url: string; 
    description: string | null;
}
export interface AssetCreate { 
    eventId: string;
    type: string;
    url: string;
    description: string | null;
}
export interface AssetUpdate {
    id: string;
    type: string;
    url: string;
    description: string | null;
}
export interface AssetRepository {
    createAsset(data: AssetCreate): Promise<Asset>;
    deleteAsset(id: string): Promise<void>;
    updateAsset(data: AssetUpdate): Promise<AssetUpdate>;
    getAllAssetsByEventId(eventId: string): Promise<Asset[]>;
    getAssetById(id: string): Promise<Asset | null>;
}