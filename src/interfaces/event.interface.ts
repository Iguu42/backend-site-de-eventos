export interface Event{
    id: number;
    title: string;
    description: string;
    location: string;
    capacity: number;
    categoryId: number;
    startDate: Date;
    endDate: Date;
    format: string;
    producer: string;
    ageRating: number;
    additionalDetails: string;
    creatorId: number;
}
export interface EventCreate{
    title: string;
    description: string;
    location: string;
    capacity: number;
    categoryId: number;
    startDate: Date;
    endDate: Date;
    format: string;
    producer: string;
    ageRating: number;
    additionalDetails: string;
    creatorId: number;
}

export interface EventRepository {
    create(data: EventCreate): Promise<Event>;
}