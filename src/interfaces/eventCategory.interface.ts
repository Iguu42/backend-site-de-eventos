export interface EventCategory {
    id: string;
    description: string;
    isActive: boolean;
}
export interface EventCategoryCreate {
    description: string;
    isActive: boolean;
}

export interface EventCategoryRepository {
    create(data: EventCategoryCreate): Promise<EventCategory>;
    getAll(): Promise<EventCategory[]>;
}