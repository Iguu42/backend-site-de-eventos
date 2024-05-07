import { prisma } from "../db/prisma-client";
import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        try {
            return await prisma.user.create({
                data: {
                    externalId: data.externalId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    role: 'user'
                }
            });
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.user.delete({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

    async userUpdate(data: UserUpdate): Promise<UserUpdate> {
        try {
            const result = await prisma.user.update({
                where: {
                    id: data.id
                },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    role: data.role,
                    cpf: data.cpf,
                    phone: data.phone
                }
                
        });
        return result;
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    async userUpdateByClerk(data: any): Promise<any> {
        try {
            const result = await prisma.user.update({
                where: {
                    id: data.id
                },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                }
                
        });
        return result;
        } catch (error) {
            throw new Error('Failed to update user');
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

    async findUserByExternalId(externalId: string): Promise<User | null> {
        try {
            return await prisma.user.findFirst({
                where: {
                    externalId
                }
            });
        } catch (error) {
            throw new Error('Failed to find user by external id.');
        }
    }
}
export { UserRepositoryPrisma };
