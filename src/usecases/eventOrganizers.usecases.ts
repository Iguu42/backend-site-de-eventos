import { EventOrganizerRepositoryPrisma } from '../repositories/eventOrganizers.repository';
import { EventOrganizers, EventOrganizersCreate, EventOrganizersRepository } from './../interfaces/eventOrganizer.interface';

class EventOrganizerUseCase {
    static delete(eventId: string, userId: string) {
        throw new Error('Method not implemented.');
    }
    private eventOrganizersRepository: EventOrganizersRepository;
    constructor() {
        this.eventOrganizersRepository = new EventOrganizerRepositoryPrisma();
    }
    async create(data: EventOrganizersCreate): Promise<EventOrganizers> {
        return await this.eventOrganizersRepository.createEventOrganizers(data);
    }
    async delete(eventId: string, userId: string): Promise<void> {
        await this.eventOrganizersRepository.deleteEventOrganizers(eventId, userId);
    }
    async getAllEventsOrganizerByUserId(userId: string): Promise<EventOrganizers[]> {
        return await this.eventOrganizersRepository.getEventOrganizersByUserId(userId);
    }
    async getAllOrganizersByEventId(eventId: string): Promise<EventOrganizers[]> {
        return await this.eventOrganizersRepository.getEventOrganizersByEventId(eventId);
    }
}

export { EventOrganizerUseCase };