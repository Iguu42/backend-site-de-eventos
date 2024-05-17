import { prisma } from "../db/prisma-client";
import { WaitingList, WaitingListCreate, WaitingListRepository, WaitingListUpdate } from "../interfaces/waitingList.interface";

class WaitingListRepositoryPrisma implements WaitingListRepository {

    async createWaitingList(data: WaitingListCreate): Promise<WaitingList> {
        try {
            return await prisma.waitingList.create({
                data: {
                    eventId: data.eventId,
                    userId: data.userId,
                    timestamp: new Date(),
                    status: data.status,
                    offerExpiration: data.offerExpiration || null
                }
            })
        } catch (error) {
            throw new Error('Unable to create waiting list');
        }
    }

    async deleteWaitingList(id: string): Promise<void> {
        try {
            await prisma.waitingList.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new Error('Failed to delete waiting list');
        }
    }

    async updateWaitingList(data: WaitingListUpdate): Promise<WaitingList> {
        try {
            return prisma.waitingList.update({
                where: {
                    id: data.id
                },
                data: {
                    eventId: data.eventId,
                    userId: data.userId,
                    timestamp: new Date(),
                    status: data.status,
                    offerExpiration: data.offerExpiration || null
                }
            });
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

    async getAllWaitingListsByEventId(eventId: string): Promise<WaitingList[]> {
        try {
            return await prisma.waitingList.findMany({
                where: {
                    eventId
                }
            });
        } catch (error) {
            throw new Error('Unable to get all waiting lists by event id');
        }
    }

    async getWaitingListById(id: string): Promise<WaitingList | null> {
        try {
            return prisma.waitingList.findUnique({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}

export { WaitingListRepositoryPrisma };