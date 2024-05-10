import { FastifyInstance } from "fastify";
import { TicketCreate } from "../interfaces/ticket.interface";
import { TicketUseCase } from "../usecases/ticket.usecase";

const ticketUseCase = new TicketUseCase();

export async function ticketRoutes(fastify: FastifyInstance) {
  RegisterTicketRoutes(fastify);
}

function RegisterTicketRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: TicketCreate }>("/", async (req, reply) => {
    try {
      const data = await ticketUseCase.create(req.body);
      reply.code(201).send(data);
    } catch (error) {
      reply.code(400).send(error);
    }
  });
}
