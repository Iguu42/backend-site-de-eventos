import { FastifyInstance } from "fastify";
import { EventRepositoryPrisma } from "../repositories/event.repository";
import { EventUseCase } from "../usecases/event.usecase";
import { EventCreate } from "../interfaces/event.interface";

const eventRepository = new EventRepositoryPrisma();
const eventUseCase = new EventUseCase(eventRepository);

export async function eventRoutes(fastify:FastifyInstance) {
    registerEventRoute(fastify);
}

function registerEventRoute(fastify: FastifyInstance){
    fastify.post<{Body: EventCreate}>('/', async(req, reply)=> {
        const { title,description,capacity,location,categoryId,startDate,endDate,format,producer,ageRating,additionalDetails,creatorId} = req.body;
    try {
        const data = await eventUseCase.create({ title,description,capacity,location,categoryId,startDate,endDate,format,producer,ageRating,additionalDetails,creatorId});
        reply.code(201).send(data);
    } catch (error) {
        reply.code(400).send(error); 
    }
    })
}


