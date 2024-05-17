import { FastifyInstance } from "fastify";
import { WaitingListCreate, WaitingListUpdate } from "../interfaces/waitingList.interface";
import { WaitingListUseCase } from "../usecases/waitingList.usecase";
import { date } from "zod";

const waitingListUseCase = new WaitingListUseCase();

export async function waitingListRoutes(fastify: FastifyInstance) {
    createWaitingListRoute(fastify);
    getWaitingListRoute(fastify);
    getAllWaitingListsByEventIdRoute(fastify);
    updateWaitingListRoute(fastify);
    deleteWaitingListRoute(fastify);
}

function createWaitingListRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: WaitingListCreate }>('/', async (req, reply) => {
        const { eventId, userId, timestamp, status, offerExpiration } = req.body;
        try {
            const data = await waitingListUseCase.create({ eventId, userId, timestamp, status, offerExpiration });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function updateWaitingListRoute(fastify: FastifyInstance) {
    fastify.patch<{ Body: WaitingListUpdate, Params: { id: string } }>('/', async (req, reply) => {
        const id = req.params.id;
        const { eventId, userId, timestamp, status, offerExpiration } = req.body;
        try {
            const data = await waitingListUseCase.update({ id, eventId, userId, timestamp, status, offerExpiration });
            reply.code(200).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function deleteWaitingListRoute(fastify: FastifyInstance) {
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            await waitingListUseCase.delete(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function getWaitingListRoute(fastify: FastifyInstance) {
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const id = req.params.id;
        try {
            const data = await waitingListUseCase.getWaitingListById(id);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function getAllWaitingListsByEventIdRoute(fastify: FastifyInstance) {
    fastify.get<{ Params: { eventId: string } }>('/', async (req, reply) => {
        const eventId = req.params.eventId;
        try {
            const data = await waitingListUseCase.getAllWaitingListsByEventId(eventId);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

