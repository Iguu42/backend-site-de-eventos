import { prisma } from "../db/prisma-client";
import { EventCategory, EventCategoryCreate, EventCategoryRepository, } from "../interfaces/eventCategory.interface";

class EventCategoryRepositoryPrisma implements EventCategoryRepository {
    async create(data: EventCategoryCreate): Promise<EventCategory> {
        try {
            return await prisma.eventCategory.create({
                data: {
                    description: data.description,
                    isActive: data.isActive || true
                }
            });
        } catch (error) {
            throw new Error('Unable to create event category');
        }
    }

    async getAll(): Promise<EventCategory[]> {
        try {
            return await prisma.eventCategory.findMany();
        } catch (error) {
            throw new Error('Unable to get all event categories');
        }
    }
}

export { EventCategoryRepositoryPrisma };