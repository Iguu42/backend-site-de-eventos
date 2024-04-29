import { TicketType } from "@prisma/client";
import { Ticket, TicketCreate, TicketRepository, TicketTypeCreate } from "../interfaces/ticket.interface";
import {TicketRepositoryPrisma} from '../repositories/ticket.repository'

class TicketUseCase{

private ticketRepository: TicketRepository

    constructor(){
        this.ticketRepository = new TicketRepositoryPrisma();
    }

    async createTicket(data: TicketCreate):Promise<Ticket>{
        return await this.ticketRepository.createTicket(data);
    }

    async createTicketType(data: TicketTypeCreate):Promise<TicketType>{
        return await this.ticketRepository.createTicketType(data);
    }

}

export {TicketUseCase}