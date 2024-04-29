import { prisma } from "../db/prisma-client";
import {
  Ticket,
  TicketCreate,
  TicketRepository,
  TicketType,
  TicketTypeCreate,
} from "../interfaces/ticket.interface";

class TicketRepositoryPrisma implements TicketRepository {
  async createTicket(data: TicketCreate): Promise<Ticket> {
    try {
      return await prisma.ticket.create({
        data: {
          ticketTypeId: data.ticketTypeId,
          purchaseOrderId: data.purchaseOrderId,
          participantName: data.participantName,
          participantEmail: data.participantEmail,
          price: data.price,
          cancelledBy: null, 
          status: data.status,
          purchaseDate: data.status ?? null,
          seatLocation: data.seatLocation ?? null,
        },
      });
    } catch (error) {
      throw new Error("An error occurred when generating your ticket");
    }
  }

  async createTicketType(data: TicketTypeCreate): Promise<TicketType> {
    try {
      return await prisma.ticketType.create({
        data: {
          eventId: data.eventId,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          salesStartDate: data.salesStartDate ?? null,
          salesEndDate: data.salesEndDate ?? null,
          isActive: data.isActive || true
        },
      });
      
    } catch (error) {
      throw new Error("An error occurred when creating the ticket type");
    }
  }

  
  async findById(id: number): Promise<Ticket | null> {
    throw new Error("Method not implemented.");
  }
}

export { TicketRepositoryPrisma };
