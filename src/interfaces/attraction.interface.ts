export interface Attraction {
    id: string;
    eventId: string;
    name: string;
    imageUrl: string;
    description: string | null;
}
export interface AttractionCreate {
    eventId: string;
    name: string;
    imageUrl: string;
    description: string| null;
}
export interface AttractionUpdate {
    id: string;
    eventId: string;
    name: string;
    imageUrl: string;
    description: string| null;
}

export interface AttractionRepository {
    createAttraction(data: AttractionCreate): Promise<Attraction>;
    deleteAttraction(id: string): Promise<void>;
    updateAttraction(data: AttractionUpdate): Promise<Attraction>;
    getAllAttractionsByEventId(eventId: string): Promise<Attraction[]>;
    getAttractionById(id: string): Promise<Attraction | null>;
}
