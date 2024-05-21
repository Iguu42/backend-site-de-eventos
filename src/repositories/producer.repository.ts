import { ProducerRepository, ProducerCreate } from './../interfaces/producer.interface';
import { prisma } from "../db/prisma-client";

class ProducerRepositoryPrisma implements ProducerRepository {
    async createProducer(data: ProducerCreate): Promise<ProducerCreate> {
        try {
            return await prisma.producer.create({
                data: {
                    name: data.name,
                    email: data.email,
                    description: data.description,
                    imageUrl: data.imageUrl
                }
            })
        } catch (error) {
            throw new Error('Unable to create producer');
        }
    }
    async deleteProducer(id: string): Promise<void> {
        try {
            await prisma.producer.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Unable to delete producer');
        }
    }
    async updateProducer(data: any): Promise<any> {
        try {
            return await prisma.producer.update({
                where: {
                    id: data.id
                },
                data: {
                    name: data.name,
                    email: data.email,
                    description: data.description,
                    imageUrl: data.imageUrl
                }
            })
        } catch (error) {
            throw new Error('Unable to update producer');
        }
    }
    async getAllProducers(): Promise<any> {
        try {
            return await prisma.producer.findMany();
        } catch (error) {
            throw new Error('Unable to get all producers');
        }
    }
    async getProducerById(id: string): Promise<any> {
        try {
            return await prisma.producer.findUnique({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Unable to get producer by id');
        }
    }
}

export { ProducerRepositoryPrisma };