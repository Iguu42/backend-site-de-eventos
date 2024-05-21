import { EventOrganizersCreate } from './../interfaces/eventOrganizer.interface';
import { FastifyInstance } from "fastify";
import { EventOrganizerUseCase } from "../usecases/eventOrganizers.usecases";

const eventOrganizersUseCase = new EventOrganizerUseCase();

export async function eventOrganizersRoutes(fastify: FastifyInstance) {
    createEventOrganizersRoute(fastify);
    deleteEventOrganizersRoute(fastify);
    getAllEventsOrganizerRoute(fastify);
}

function createEventOrganizersRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: EventOrganizersCreate }>('/', async (req, reply) => {
        const { eventId, userId } = req.body;
        try {
            const data = await eventOrganizersUseCase.create({ eventId, userId });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    })
}

function deleteEventOrganizersRoute(fastify: FastifyInstance) {
    fastify.delete<{ Params: { eventId: string, userId: string } }>('/event/:eventId/user/:userId', async (req, reply) => {
        const { eventId, userId } = req.params;

        try {
            if (!eventId || !userId) {
                throw new Error('eventId and userId must be provided.');
            }
            await eventOrganizersUseCase.delete(eventId, userId);

            reply.code(204).send();
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function getAllEventsOrganizerRoute(fastify: FastifyInstance) {
    fastify.get('/', async (req, reply) => {
        const { eventId, userId } = req.query as { eventId?: string, userId?: string };

        try {
            let data;
            if (eventId) {
                data = await eventOrganizersUseCase.getAllOrganizersByEventId(eventId as string);
            } else if (userId) {
                data = await eventOrganizersUseCase.getAllEventsOrganizerByUserId(userId as string);
            } else {
                throw new Error('You must provide either eventId or userId as query parameters.');
            }
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}