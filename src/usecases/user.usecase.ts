import { log } from "console";
import { User, UserCreate, UserRepository, UserUpdate, UserUpdateByClerk } from "../interfaces/user.interface";

class UserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    };

    async create({ externalId, firstName, lastName, email }: UserCreate): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        return this.userRepository.create({ externalId, firstName, lastName, email });
    };

    async delete(id: string): Promise<void> {
        return await this.userRepository.delete(id);
    };
    async deleteByClerk(externalId: string): Promise<void> {
        const findId = await this.userRepository.findUserByExternalId(externalId);
        if (!findId) throw new Error('User not found');
        console.log(findId.id);
        return await this.userRepository.delete(findId.id);
    };

    async update({ id, firstName, lastName, email, role, cpf, phone }: UserUpdate): Promise<UserUpdate> {
        const user = await this.userRepository.findUserByExternalOrId(id)
        if(!user){
            throw new Error('User not found');
        }
        return await this.userRepository.userUpdate({ id: user.id, firstName, lastName, email, role, cpf, phone });
    }

    async updateByClerk({ externalId, firstName, lastName, email }: UserUpdateByClerk): Promise<UserUpdateByClerk> {
        if (!externalId) {
            throw new Error('External ID is required');
        }
        log(externalId);
        const findId = await this.userRepository.findUserByExternalId(externalId);
        if (!findId) throw new Error('User not found');
        return await this.userRepository.userUpdateByClerk({ id: findId.id, firstName, lastName, email })

    }
    async findUserByExternalOrId(id: string): Promise<User | null> {
        const data = await this.userRepository.findUserByExternalOrId(id);
        if (!data) throw new Error('User not found')
        return data;
    }
    async findAllEventsByExternalId(externalId: string): Promise<any> {
        return await this.userRepository.findAllEventsByExternalId(externalId);
    }

};
export { UserUseCase };
