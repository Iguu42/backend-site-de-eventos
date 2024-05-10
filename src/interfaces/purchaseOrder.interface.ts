export interface PurchaseOrder {
    id: string;
    userId: string;
    eventId: string;
    totalPrice: Number;
    quantityTickets: number;
    status: string;
}
export interface PurchaseOrderAndTicketsCreate {
    userId: string;
    eventId: string;
    ticketTypeId: string;
    quantityTickets: number;
    status: string;
    participantName: string;
    participantEmail: string;
}


export interface PurchaseOrderRepository {
    create(data: PurchaseOrderAndTicketsCreate): Promise<PurchaseOrder | undefined>;
}
