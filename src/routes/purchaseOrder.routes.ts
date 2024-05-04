import { FastifyInstance } from "fastify";
import { PurchaseOrderAndTicketsCreate } from "../interfaces/purchaseOrder.interface";
import { PurchaseOrderUseCase } from "../usecases/purchaseOrder.usecases";
import queue from "../lib/queue.lib";

const purchaseOrderUseCase = new PurchaseOrderUseCase();

export async function purchaseOrderRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: PurchaseOrderAndTicketsCreate }>('/', async (req, reply) => {
    try {
      const data = await queue.add({...req.body});
      const result = await data.finished();
      reply.code(201).send(result);
    } catch (error) {
      reply.code(400).send(error);
    }
  });
}
