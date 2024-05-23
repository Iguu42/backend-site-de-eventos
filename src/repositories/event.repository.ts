import { prisma } from "../db/prisma-client";
import { Event, EventCreate, EventRepository, EventsGetByCategory, RecentEvents } from "../interfaces/event.interface";

class EventRepositoryPrisma implements EventRepository {
    async create(data: EventCreate): Promise<Event> {
        try {
            return await prisma.event.create({
                data: {
                    title: data.title,
                    description: data.description,
                    addressId: data.addressId,
                    capacity: data.capacity,
                    categoryId: data.categoryId,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    format: data.format,
                    ageRating: data.ageRating,
                    additionalDetails: data.additionalDetails,
                    creatorId: data.creatorId,
                    producerId: data.producerId
                }
            })
        } catch (error) {
            throw new Error('Unable to create event');
        }
    }

    async getEventById(id: string): Promise<Event | null> {
        try {
            return await prisma.event.findUnique({
                where: {
                    id
                },
                include: {
                    ticketTypes: {
                        select: {
                            id: true,
                            description: true,
                            price: true,
                            quantity: true,
                            salesStartDate: true,
                            salesEndDate: true,
                            isActive: true
                        }
                    },
                    assets: {
                        select: {
                            id: true,
                            url: true,
                            type: true,
                            description: true
                        }
                    },
                    attractions: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            imageUrl: true
                        }
                    },
                    producers: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            description: true,
                            imageUrl: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error('Unable to get event by id');
        }
    }
    async getEventsByCategory(categoryId: string): Promise<EventsGetByCategory[]> {
        try {
            return await prisma.event.findMany({
                where: {
                    categoryId
                },

                select: {
                    id: true,
                    title: true,
                    addressId: true,
                    startDate: true,
                    assets: {
                        select: {
                            id: true,
                            url: true,
                            type: true,
                            description: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error('Unable to get events by category');
        }
    }
    async getRecentEvents(): Promise<RecentEvents[]> {
        try {
            return await prisma.event.findMany({
                take: 10,
                orderBy: {
                    startDate: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    addressId: true,
                    startDate: true,
                    assets: {
                        select: {
                            id: true,
                            url: true,
                            type: true,
                            description: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error('Unable to get recent events');
        }
    }
    async getEventsByCreatorId(creatorId: string): Promise<Event[]> {
        try {
            return await prisma.event.findMany({
                where: {
                    creatorId
                }
            });
        } catch (error) {
            throw new Error('Unable to get events by creator id');
        }
    }
}

export { EventRepositoryPrisma };