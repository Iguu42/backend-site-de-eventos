import { FastifyInstance } from "fastify";
import { ProducerUseCase } from "../usecases/producer.usecases";
import { ProducerCreate, ProducerUpdate } from "../interfaces/producer.interface";

const producerUseCase = new ProducerUseCase();

export async function producerRoutes(fastify: FastifyInstance) {
    createProducerRoute(fastify);
    getProducerByIdRoute(fastify);
    updateProducerRoute(fastify);
    deleteProducerRoute(fastify);
    getAllProducersRoute(fastify);
}

function createProducerRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: ProducerCreate }>('/', async (req, reply) => {
        const { name, email, description, imageUrl } = req.body;
        try {
            const data = await producerUseCase.createProducer({ name, email, description, imageUrl });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function updateProducerRoute(fastify: FastifyInstance) {
    fastify.patch<{ Body: ProducerUpdate, Params: { id: string } }>('/', async (req, reply) => {
        const id = req.params.id;
        const { name, email, description, imageUrl } = req.body;
        try {
            const data = await producerUseCase.updateProducer({ id, name, email, description, imageUrl });
            reply.code(200).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function deleteProducerRoute(fastify: FastifyInstance) {
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            await producerUseCase.deleteProducer(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function getAllProducersRoute(fastify: FastifyInstance) {
    fastify.get('/', async (req, reply) => {
        try {
            const data = await producerUseCase.getAllProducers();
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function getProducerByIdRoute(fastify: FastifyInstance) {
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const id = req.params.id;
        try {
            const data = await producerUseCase.getProducerById(id);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}