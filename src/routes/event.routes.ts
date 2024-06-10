import { FastifyInstance } from "fastify";
import { EventRepositoryPrisma } from "../repositories/event.repository";
import { EventUseCase } from "../usecases/event.usecase";
import { EventCreate } from "../interfaces/event.interface";
import { get } from "http";
import { jwtValidator } from "../middlewares/auth.middlewares";

const eventRepository = new EventRepositoryPrisma();
const eventUseCase = new EventUseCase(eventRepository);

export async function eventRoutes(fastify: FastifyInstance) {
    registerEventRoute(fastify);
    getEventById(fastify);
    getEventsByCategory(fastify);
    getRecentEvents(fastify);
    getEventsByCreatorId(fastify);
    getEventsByExternalId(fastify);
}

function registerEventRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: EventCreate }>('/', async (req, reply) => {
        const { title, description, capacity, addressId, categoryId, startDate, endDate, format, producerId, ageRating, additionalDetails, creatorId } = req.body;
        try {
            const data = await eventUseCase.create({ title, description, capacity, addressId, categoryId, startDate, endDate, format, producerId, ageRating, additionalDetails, creatorId });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    })
}

function getEventById(fastify: FastifyInstance) {
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await eventUseCase.getEventById(id);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    })
}

function getEventsByCategory(fastify: FastifyInstance) {
    fastify.get<{ Params: { categoryId: string } }>('/category/:categoryId', async (req, reply) => {
        const { categoryId } = req.params;
        try {
            const data = await eventUseCase.getEventsByCategory(categoryId);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    })
}
function getRecentEvents(fastify: FastifyInstance) {
    fastify.get('/recent', async (req, reply) => {
        try {
            const data = await eventUseCase.getRecentEvents();
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    })
}
function getEventsByCreatorId(fastify: FastifyInstance) {
    fastify.get<{ Params: { creatorId: string } }>('/creator/:creatorId', async (req, reply) => {
        const { creatorId } = req.params;
        try {
            const data = await eventUseCase.getEventsByCreatorId(creatorId);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    })
}
function getEventsByExternalId(fastify: FastifyInstance) {
    fastify.addHook("preHandler", jwtValidator);
    fastify.get<{ Params: { externalId: string } }>('/events', async (req, reply) => {
        const { externalId } = req.params;
        try {
            const data = await eventUseCase.getEventsByExternalId(externalId);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}