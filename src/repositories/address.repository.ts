import { prisma } from "../db/prisma-client";
import { Address, AddressCreate, AddressRepository } from "../interfaces/address.interface";

class AddressRepositoryPrisma implements AddressRepository {
    async create(data: AddressCreate): Promise<Address> {
        try {
            return await prisma.address.create({
                data: {
                    street: data.street,
                    number: data.number,
                    complement: data.complement,
                    neighborhood: data.neighborhood,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode
                }
            })
        } catch (error) {
            throw new Error('Unable to create address');
        }
    }
    async getAddressById(id: string): Promise<Address | null> {
        try {
            return await prisma.address.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new Error('Unable to find address by id');
        }
    }
}

export { AddressRepositoryPrisma };