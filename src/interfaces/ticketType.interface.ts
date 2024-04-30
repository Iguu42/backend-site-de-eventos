export interface TicketType {
    id: number;
    eventId: number;
    description: string;
    price: number;
    quantity: number;
    salesStartDate: Date | null;
    salesEndDate: Date | null;
    isActive: boolean;
}

export interface TicketTypeCreate {
    eventId: number;
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