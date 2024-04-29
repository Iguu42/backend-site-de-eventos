import { FastifyInstance } from "fastify";
import { PurchaseOrderAndTicketsCreate } from "../interfaces/purchaseOrder.interface";
import { PurchaseOrderUseCase } from "../usecases/purchaseOrder.usecases";
import Bull from "bull";
import 'dotenv/config'

const purchaseOrderUseCase = new PurchaseOrderUseCase();
const queue = new Bull('purchaseOrder', { redis: { host: process.env.REDIS_HOST as string, port: parseInt(process.env.REDIS_PORT as string) } });

export async function purchaseOrderRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: PurchaseOrderAndTicketsCreate }>('/', async (req, reply) => {
        try {
            const data = await queue.add({...req.body});
            const result = await data.finished();
            reply.code(201).send(result);
        } catch (error) {
            reply.code(400).send( error );
        }
    });
}

queue.process(async (job) => {
    console.log('Processing job:', job.data);
    return await purchaseOrderUseCase.create(job.data);
})

