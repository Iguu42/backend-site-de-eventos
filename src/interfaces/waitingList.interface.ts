export interface WaitingList {
    id: string;
    eventId: string;
    userId: string;
    timestamp: Date | null;
    status: string;
    offerExpiration: Date | null;
}

export interface WaitingListCreate {
    eventId: string;
    userId: string;
    timestamp: Date;
    status: string;
    offerExpiration: Date | null;
}

export interface WaitingListUpdate {
    id: string;
    eventId: string;
    userId: string;
    timestamp: Date;
    status: string;
    offerExpiration: Date | null;
}

export interface WaitingListRepository {
    createWaitingList(data: WaitingListCreate): Promise<WaitingList>;
    deleteWaitingList(id: String): Promise<void>;
    updateWaitingList(data: WaitingListUpdate): Promise<WaitingList>;
    getAllWaitingListsByEventId(eventId: String): Promise<WaitingList[]>;
    getWaitingListById(id: String): Promise<WaitingList | null>;
}