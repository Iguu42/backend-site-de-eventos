import { prisma } from "../db/prisma-client"
import { EventOrganizers, EventOrganizersCreate, EventOrganizersRepository } from "../interfaces/eventOrganizer.interface";

class EventOrganizerRepositoryPrisma implements EventOrganizersRepository {
    async deleteEventOrganizers(eventId: string, userId: string): Promise<void> {
        try {
            await prisma.eventOrganizers.delete({
                where: {
                    eventId_userId: {
                        eventId,
                        userId,
                    },
                },
            });
        } catch (error) {
            throw new Error("Failed to delete eventOrganizers.");
        }

    }
    async getEventOrganizersByEventId(eventId: string): Promise<EventOrganizers[]> {
        try {
            return await prisma.eventOrganizers.findMany({
                where: {
                    eventId
                }
            })
        } catch (error) {
            throw new Error("Unable to get all event organizers by eventId.");
        }
    }

    async getEventOrganizersByUserId(userId: string): Promise<EventOrganizers[]> {
        try {
            return await prisma.eventOrganizers.findMany({
                where: {
                    userId
                }
            })
        } catch (error) {
            throw new Error("Unable to get all event by userId.");
        }
    }
    async createEventOrganizers(data: EventOrganizersCreate): Promise<EventOrganizers> {
        try {
            return await prisma.eventOrganizers.create({
                data: {
                    eventId: data.eventId,
                    userId: data.userId
                }

            })
        } catch (error) {
            throw new Error('Unable to create EventOrganizer');
        }
    }
}
export { EventOrganizerRepositoryPrisma };