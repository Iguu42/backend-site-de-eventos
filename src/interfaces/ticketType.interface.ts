export interface TicketType {
    id: string;
    eventId: string;
    description: string;
    price: number;
    quantity: number;
    salesStartDate: Date | null;
    salesEndDate: Date | null;
    isActive: boolean;
}

export interface TicketTypeCreate {
    eventId: string;
    description: string;
    price: number;
    quantity: number;
    salesStartDate: Date | null;
    salesEndDate: Date | null;
    isActive?: boolean;
}

export interface TicketTypeRepository {
create(data: TicketTypeCreate): Promise<TicketType>;
}