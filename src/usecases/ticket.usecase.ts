import { Ticket, TicketCreate, TicketRepository } from "../interfaces/ticket.interface";
import {TicketRepositoryPrisma} from '../repositories/ticket.repository'

class TicketUseCase{

private ticketRepository: TicketRepository

    constructor(){
        this.ticketRepository = new TicketRepositoryPrisma();
    }

    async create(data: TicketCreate):Promise<Ticket>{
        return await this.ticketRepository.create(data);
    }

}

export {TicketUseCase}