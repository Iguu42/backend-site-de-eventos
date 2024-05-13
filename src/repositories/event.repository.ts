import { prisma } from "../db/prisma-client";
import { Event, EventCreate, EventRepository } from "../interfaces/event.interface";

class EventRepositoryPrisma implements EventRepository{
    async create(data: EventCreate): Promise<Event>{
        try {
            return await prisma.event.create({
                data:{
                    title: data.title,
                    description: data.description,
                    location: data.location,
                    capacity: data.capacity,
                    categoryId: data.categoryId,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    format: data.format,
                    producer: data.producer,
                    ageRating: data.ageRating,
                    additionalDetails: data.additionalDetails,
                    creatorId: data.creatorId
                }
            })
        } catch (error) {
            throw new Error('Unable to create event');
        }
    }
}

export {EventRepositoryPrisma };