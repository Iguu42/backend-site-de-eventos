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
    producer: string;
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
    producer: string;
    ageRating: number;
    additionalDetails: string;
    creatorId: string;
}

export interface EventRepository {
    create(data: EventCreate): Promise<Event>;
}