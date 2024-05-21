import { ProducerCreate, ProducerRepository } from "../interfaces/producer.interface";
import { ProducerRepositoryPrisma } from "../repositories/producer.repository";

class ProducerUseCase {
    private producerRepository: ProducerRepository;
    constructor() {
        this.producerRepository = new ProducerRepositoryPrisma();
    }

    async createProducer(data: ProducerCreate): Promise<ProducerCreate> {
        return await this.producerRepository.createProducer(data);
    }

    async deleteProducer(id: string): Promise<void> {
        return await this.producerRepository.deleteProducer(id);
    }

    async updateProducer(data: any): Promise<any> {
        return await this.producerRepository.updateProducer(data);
    }

    async getAllProducers(): Promise<any> {
        return await this.producerRepository.getAllProducers();
    }

    async getProducerById(id: string): Promise<any> {
        return await this.producerRepository.getProducerById(id);
    }
}

export { ProducerUseCase };