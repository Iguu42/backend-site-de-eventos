import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

const userRepository = new UserRepositoryPrisma();
const userUseCase = new UserUseCase(userRepository);

export async function userRoutes(fastify: FastifyInstance) {
    registerUserRoute(fastify);
}

function registerUserRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
        const { externalId, name, email } = req.body;
        try {
            const data = await userUseCase.create({ externalId, name, email });
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
};

