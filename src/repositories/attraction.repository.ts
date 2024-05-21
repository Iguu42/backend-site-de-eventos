import { prisma } from "../db/prisma-client";
import { Attraction, AttractionCreate, AttractionRepository, AttractionUpdate, } from "../interfaces/attraction.interface";

class AttractionRepositoryPrisma implements AttractionRepository {
    async createAttraction(data: AttractionCreate): Promise<Attraction> {
        try {
            return await prisma.attraction.create({
                data: {
                    eventId: data.eventId,
                    name: data.name,
                    imageUrl: data.imageUrl,
                    description: data.description
                }
            })
        } catch (error) {
            throw new Error('Unable to create attraction');
        }
    }

    async deleteAttraction(id: string): Promise<void> {
        try {
            await prisma.attraction.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new Error('Failed to delete attraction');
        }
    }

    async updateAttraction(data: AttractionUpdate): Promise<Attraction> {
        try {
            const result = await prisma.attraction.update({
                where: {
                    id: data.id
                },
                data: {
                    name: data.name,
                    imageUrl: data.imageUrl,
                    description: data.description
                }
            });
            return result;
        } catch (error) {
            throw new Error('Failed to update attraction');
        }
    }

    async getAllAttractionsByEventId(eventId: string): Promise<Attraction[]> {
        try {
            return await prisma.attraction.findMany({
                where: {
                    eventId
                }
            });
        } catch (error) {
            throw new Error('Unable to get all attractions by event id');
        }
    }

    async getAttractionById(id: string): Promise<Attraction | null> {
        try {
            return await prisma.attraction.findUnique({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new Error('Unable to get attraction by id');
        }
    }
}

export { AttractionRepositoryPrisma };