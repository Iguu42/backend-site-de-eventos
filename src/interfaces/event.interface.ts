export interface Event{
    id: string;
    title: string;
    description: string;
    location: string;
    capacity: number;
    categoryId: string;
    startDate: Date;
    endDate: Date;
    format: string;
    producerId: string;
    ageRating: number;
    additionalDetails: string;
    creatorId: string;
}
export interface EventCreate{
    title: string;
    description: string;
    location: string;
    capacity: number;
    categoryId: string;
    startDate: Date;
    endDate: Date;
    format: string;
    producerId: string;
    ageRating: number;
    additionalDetails: string;
    creatorId: string;
}
export interface EventsGetByCategory{
    id: string;
    title: string;
    location: string;
    startDate: Date;
}
export interface RecentEvents{
    id: string;
    title: string;
    location: string;
    startDate: Date;
}

export interface EventRepository {
    getEventsByCategory(categoryId: string): Promise<EventsGetByCategory[]>;
    create(data: EventCreate): Promise<Event>;
    getEventById(id: string): Promise<Event | null>;
    getRecentEvents(): Promise<RecentEvents[]>;
}