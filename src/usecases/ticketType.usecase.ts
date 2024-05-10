import { TicketType } from "@prisma/client";
import {
  TicketTypeCreate,
  TicketTypeRepository,
} from "../interfaces/ticketType.interface";
import { TicketTypeRepositoryPrisma } from "../repositories/ticketType.repository";

class TicketTypeUseCase {
  private ticketTypeRepository: TicketTypeRepository;
  constructor() {
    this.ticketTypeRepository = new TicketTypeRepositoryPrisma();
  }

  async create(data: TicketTypeCreate): Promise<TicketType> {
    return await this.ticketTypeRepository.create(data);
  }
}

export { TicketTypeUseCase };
