import { User, UserCreate, UserRepository } from "../interfaces/user.interface";

class UserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async create({ externalId, name, email }: UserCreate): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        return this.userRepository.create({ externalId, name, email });
    }
}  

export { UserUseCase };
