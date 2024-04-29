export interface PurchaseOrder {
    id: number;
    userId: number;
    eventId: number;
    totalPrice: Number;
    quantityTickets: number;
    status: string;
}
export interface PurchaseOrderAndTicketsCreate {
    userId: number;
    eventId: number;
    ticketTypeId: number;
    quantityTickets: number;
    status: string;
    participantName: string;
    participantEmail: string;
}


export interface PurchaseOrderRepository {
    create(data: PurchaseOrderAndTicketsCreate): Promise<PurchaseOrder | undefined>;
}
