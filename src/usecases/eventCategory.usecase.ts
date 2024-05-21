import { EventCategory } from "@prisma/client";
import { EventCategoryCreate, EventCategoryRepository } from "../interfaces/eventCategory.interface";
import { EventCategoryRepositoryPrisma } from "../repositories/eventCategory.repository";

class EventCategoryUseCase {
    private eventCategoryRepository: EventCategoryRepository;
    constructor() {
        this.eventCategoryRepository = new EventCategoryRepositoryPrisma();
    }

    async create(data: EventCategoryCreate): Promise<EventCategory> {
        return await this.eventCategoryRepository.create(data);
    }

    async getAll(): Promise<EventCategory[]> {
        return await this.eventCategoryRepository.getAll();
    }
}

export { EventCategoryUseCase };