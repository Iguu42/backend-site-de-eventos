export interface EventOrganizers {
    eventId: string;
    userId: string;
}
export interface EventOrganizersCreate {
    eventId: string;
    userId: string;
}

export interface EventOrganizersRepository {
    createEventOrganizers(data: EventOrganizersCreate): Promise<EventOrganizers>;
    deleteEventOrganizers(eventId: string, userId: string): Promise<void>;
    getEventOrganizersByEventId(eventId: string): Promise<EventOrganizers[]>;
    getEventOrganizersByUserId(userId: string): Promise<EventOrganizers[]>;
}