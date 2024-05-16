import { FastifyInstance } from "fastify";
import { EventCategoryUseCase } from "../usecases/eventCategory.usecase";

const eventCategoryUseCase = new EventCategoryUseCase();

export async function eventCategoryRoutes(fastify: FastifyInstance) {
    createEventCategoryRoute(fastify);
    getAllEventCategoriesRoute(fastify);
}

function createEventCategoryRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: { description: string, isActive: boolean } }>('/', async (req, reply) => {
        const { description, isActive } = req.body;
        try {
            const data = await eventCategoryUseCase.create({ description, isActive });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function getAllEventCategoriesRoute(fastify: FastifyInstance) {
    fastify.get('/', async (req, reply) => {
        try {
            const data = await eventCategoryUseCase.getAll();
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}