export interface Event {
    id: string;
    title: string;
    description: string;
    capacity: number;
    categoryId: string;
    startDate: Date;
    endDate: Date;
    format: string;
    producerId: string;
    ageRating: number;
    additionalDetails: string;
    creatorId: string;
    addressId: string;
}
export interface EventCreate {
    title: string;
    description: string;
    capacity: number;
    categoryId: string;
    startDate: Date;
    endDate: Date;
    format: string;
    producerId: string;
    ageRating: number;
    additionalDetails: string;
    creatorId: string;
    addressId: string;
}
export interface EventsGetByCategory {
    id: string;
    title: string;
    addressId: string;
    startDate: Date;
}
export interface RecentEvents {
    id: string;
    title: string;
    addressId: string;
    startDate: Date;
}

export interface EventRepository {
    getEventsByCategory(categoryId: string): Promise<EventsGetByCategory[]>;
    create(data: EventCreate): Promise<Event>;
    getEventById(id: string): Promise<Event | null>;
    getRecentEvents(): Promise<RecentEvents[]>;
    getEventsByCreatorId(creatorId: string): Promise<Event[]>;
    getEventsByExternalId(externalId: string): Promise<Event[]>;
    findEventsByExternalOrId(id: string): Promise<Event | null>;
}