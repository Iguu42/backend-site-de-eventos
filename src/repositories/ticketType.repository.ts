import { prisma } from "../db/prisma-client";
import { TicketType, TicketTypeCreate, TicketTypeRepository } from "../interfaces/ticketType.interface";

class TicketTypeRepositoryPrisma implements TicketTypeRepository {

  async create(data: TicketTypeCreate): Promise<TicketType> {
    try {
      return await prisma.ticketType.create({
        data: {
          eventId: data.eventId,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          salesStartDate: data.salesStartDate ?? null,
          salesEndDate: data.salesEndDate ?? null,
          isActive: data.isActive || true,
        },
      });
    } catch (error) {
      throw new Error("An error occurred when creating the ticket type");
    }
  }
}


export { TicketTypeRepositoryPrisma }
