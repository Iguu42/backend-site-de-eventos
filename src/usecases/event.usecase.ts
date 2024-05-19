import { Event, EventCreate, EventRepository, EventsGetByCategory } from "../interfaces/event.interface";

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
}

export { EventUseCase };
