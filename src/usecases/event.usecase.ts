import { Event, EventCreate, EventRepository, EventsByCreatorId, EventsGetByCategory, RecentEvents } from "../interfaces/event.interface";

interface IEventUseCase {
    create(eventData: EventCreate): Promise<Event>;
}

class EventUseCase {
    private eventRepository: EventRepository;

    constructor(eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    async create(eventData: EventCreate): Promise<Event> {
        return await this.eventRepository.create(eventData);
    }

    async getEventById(id: string): Promise<Event | null> {
        return await this.eventRepository.getEventById(id);
    }
    async getEventsByCategory(categoryId: string): Promise<EventsGetByCategory[]> {
        return await this.eventRepository.getEventsByCategory(categoryId);
    }
    async getRecentEvents(): Promise<RecentEvents[]> {
        return await this.eventRepository.getRecentEvents();
    }
    async getEventsByCreatorId(creatorId: string): Promise<EventsByCreatorId[]> {
        return await this.eventRepository.getEventsByCreatorId(creatorId);
    }
    async getEventsByExternalId(externalId: string): Promise<Event[]> {
        const events = await this.eventRepository.getEventsByExternalId(externalId);
        if (!events || events.length === 0) throw new Error('Events not found');
        return events;
    }
    async findEventsByExternalOrId(id: string): Promise<Event | null> {
        const data = await this.eventRepository.findEventsByExternalOrId(id);
        if (!data) throw new Error('User not found')
        return data;
    }
}

export { EventUseCase };
