import {PurchaseOrder} from './purchaseOrder.interface'
import { TicketTypeCreate } from './ticketType.interface';

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
