import { prisma } from "../db/prisma-client";
import {
  Ticket,
  TicketCreate,
  TicketRepository,
} from "../interfaces/ticket.interface";

class TicketRepositoryPrisma implements TicketRepository {
  async create(data: TicketCreate): Promise<Ticket> {
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

  async findById(id: number): Promise<Ticket | null> {
    throw new Error("Method not implemented.");
  }
}

export { TicketRepositoryPrisma };
