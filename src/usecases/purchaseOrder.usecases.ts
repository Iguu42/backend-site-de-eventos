import { PurchaseOrderAndTicketsCreate, PurchaseOrderRepository } from "../interfaces/purchaseOrder.interface";
import { TicketRepository } from "../interfaces/ticket.interface";
import { PurchaseOrderRepositoryPrisma } from "../repositories/purchaseOrder.repository";
import { TicketRepositoryPrisma } from "../repositories/ticket.repository";

class PurchaseOrderUseCase {
    private purchaseOrderRepository: PurchaseOrderRepository;
    private ticketRepository : TicketRepository

    constructor(){
        this.purchaseOrderRepository = new PurchaseOrderRepositoryPrisma();
        this.ticketRepository = new TicketRepositoryPrisma()
    }

    async create(data: PurchaseOrderAndTicketsCreate){
        return await this.purchaseOrderRepository.create(data);
    }
}

export { PurchaseOrderUseCase };
