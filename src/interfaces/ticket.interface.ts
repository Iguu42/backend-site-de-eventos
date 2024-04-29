import {PurchaseOrder} from './purchaseOrder.interface'

export interface TicketType {
    id: number;
    eventId: number;
    description: string;
    price: number;
    quantity: number;
    salesStartDate?: Date | null;
    salesEndDate?: Date | null;
    isActive: boolean;
    event: Event;
    tickets: Ticket[];
}


export interface Ticket {
    id: number;
    ticketTypeId: number;
    purchaseOrderId: number;
    participantName: string;
    participantEmail: string;
    price: number;
    status: string;
    cancelledBy?: string | null;
    purchaseDate?: Date | null;
    seatLocation?: string | null;
}

export interface TicketCreate{
    ticketTypeId: number;
    purchaseOrderId: number;
    participantName: string;
    participantEmail: string;
    price: number;
    status: string;
    cancelledBy: null;
    purchaseDate?: Date | null;
    seatLocation?: string | null;
}

export interface TicketRepository {
    create(data: TicketCreate): Promise<Ticket>;
    findById(id: number): Promise <Ticket | null>;
}
