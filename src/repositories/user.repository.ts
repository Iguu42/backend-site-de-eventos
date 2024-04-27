import { prisma } from "../db/prisma-client";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        try {
            return await prisma.user.create({
                data: {
                    externalId: data.externalId,
                    name: data.name,
                    email: data.email,
                    role: 'user' 
                }
            });
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await prisma.user.findFirst({
                where: {
                    email
                }
            });
        } catch (error) {
            throw new Error('Failed to find user by email');
        }
    }
}

export { UserRepositoryPrisma };
