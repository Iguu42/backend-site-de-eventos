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
export interface AssetRepository {
    create(data: AssetCreate): Promise<Asset>;
}