import { FastifyInstance } from "fastify";
import { TicketTypeCreate } from "../interfaces/ticketType.interface";
import { TicketTypeUseCase } from "../usecases/ticketType.usecase";

const ticketTypeUseCase = new TicketTypeUseCase();

export async function ticketTypeRoutes(fastify: FastifyInstance) {
  RegisterTicketTypeRoutes(fastify);
}

function RegisterTicketTypeRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: TicketTypeCreate }>("/", async (req, reply) => {
    try {
      const data = await ticketTypeUseCase.create(req.body);
      reply.code(201).send(data);
    } catch (error) {
      reply.code(400).send(error);
    }
  });
}
