import {PurchaseOrder} from './purchaseOrder.interface'
import { TicketTypeCreate } from './ticketType.interface';

export interface Ticket {
    id: string;
    ticketTypeId: string;
    purchaseOrderId: string;
    participantName: string;
    participantEmail: string;
    price: number;
    status: string;
    cancelledBy?: string | null;
    purchaseDate?: Date | null;
    seatLocation?: string | null;
}

export interface TicketCreate{
    ticketTypeId: string;
    purchaseOrderId: string;
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
