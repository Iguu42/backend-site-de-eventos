import { Event, EventCreate, EventRepository } from "../interfaces/event.interface";

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
}

export { EventUseCase };
