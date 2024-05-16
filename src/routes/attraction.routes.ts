import { FastifyInstance } from "fastify";
import { AttractionRepositoryPrisma } from "../repositories/attraction.repository";
import { AttractionUseCase } from "../usecases/attraction.usecases";
import { AttractionCreate, AttractionUpdate } from "../interfaces/attraction.interface";

const attractionUseCase = new AttractionUseCase();

export async function attractionRoutes(fastify: FastifyInstance) {
    createAttrractionRoute(fastify);
    getAttractionRoute(fastify);
    getAllAttractionsByEventIdRoute(fastify);
    updateAttrractionRoute(fastify);
    deleteAttractionRoute(fastify);
}

function createAttrractionRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: AttractionCreate }>('/', async (req, reply) => {
        const { eventId, name, imageUrl, description } = req.body;
        try {
            const data = await attractionUseCase.create({ eventId, name, imageUrl, description });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function updateAttrractionRoute(fastify: FastifyInstance) {
    fastify.patch<{ Body: AttractionUpdate, Params: { id: string } }>('/', async (req, reply) => {
        const id = req.params.id;
        const { eventId, name, imageUrl, description } = req.body;
        try {
            const data = await attractionUseCase.update({ id, eventId, name, imageUrl, description });
            reply.code(200).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function deleteAttractionRoute(fastify: FastifyInstance) {
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            await attractionUseCase.delete(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function getAttractionRoute(fastify: FastifyInstance) {
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const id = req.params.id;
        try {
            const data = await attractionUseCase.getAttractionById(id);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function getAllAttractionsByEventIdRoute(fastify: FastifyInstance) {
    fastify.get<{ Params: { eventId: string } }>('/', async (req, reply) => {
        const eventId = req.params.eventId;
        try {
            const data = await attractionUseCase.getAllAttractionsByEventId(eventId);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}