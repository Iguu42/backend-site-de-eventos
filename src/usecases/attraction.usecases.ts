import { Attraction } from "@prisma/client";
import { AttractionCreate, AttractionRepository, AttractionUpdate } from "../interfaces/attraction.interface";
import { AttractionRepositoryPrisma } from "../repositories/attraction.interface";

class AttractionUseCase {
    private attractionRepository: AttractionRepository;
    constructor() {
        this.attractionRepository = new AttractionRepositoryPrisma();
    }

    async create(data: AttractionCreate): Promise<Attraction> {
        return await this.attractionRepository.createAttraction(data);
    }

    async delete(id: string): Promise<void> {
        await this.attractionRepository.deleteAttraction(id);
    };

    async update(data: AttractionUpdate): Promise<Attraction> {
        return await this.attractionRepository.updateAttraction(data);
    }

    async getAllAttractionsByEventId(eventId: string): Promise<Attraction[]> {
        return await this.attractionRepository.getAllAttractionsByEventId(eventId);
    }

    async getAttractionById(id: string): Promise<Attraction | null> {
        return await this.attractionRepository.getAttractionById(id);
    }
}

export { AttractionUseCase };