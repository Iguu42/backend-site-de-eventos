import { WaitingList, WaitingListCreate, WaitingListRepository, WaitingListUpdate } from "../interfaces/waitingList.interface";
import { WaitingListRepositoryPrisma } from "../repositories/waitingList.repository";

class WaitingListUseCase {
    private waitingListRepository: WaitingListRepository;
    constructor() {
        this.waitingListRepository = new WaitingListRepositoryPrisma();
    }
    async create(data: WaitingListCreate): Promise<WaitingList> {
        return await this.waitingListRepository.createWaitingList(data);
    }

    async delete(id: string): Promise<void> {
        await this.waitingListRepository.deleteWaitingList(id);
    }

    async update(data: WaitingListUpdate): Promise<WaitingList> {
        return await this.waitingListRepository.updateWaitingList(data);
    }

    async getAllWaitingListsByEventId(eventId: string): Promise<WaitingList[]> {
        return await this.waitingListRepository.getAllWaitingListsByEventId(eventId);
    }


    async getWaitingListById(id: string): Promise<WaitingList | null> {
        return await this.waitingListRepository.getWaitingListById(id);
    }
}
export { WaitingListUseCase };

