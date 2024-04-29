import { PurchaseOrderAndTicketsCreate, PurchaseOrderRepository } from "../interfaces/purchaseOrder.interface";
import { PurchaseOrderRepositoryPrisma } from "../repositories/purchaseOrder.repository";

class PurchaseOrderUseCase {
    private purchaseOrderRepository: PurchaseOrderRepository;

    constructor(){
        this.purchaseOrderRepository = new PurchaseOrderRepositoryPrisma();
    }

    async create(data: PurchaseOrderAndTicketsCreate){
        return await this.purchaseOrderRepository.create(data);
    }
}

export { PurchaseOrderUseCase };
