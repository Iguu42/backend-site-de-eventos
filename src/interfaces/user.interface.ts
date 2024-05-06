export interface User{
    id: string;
    externalId: string;
    name: string;
    email: string;
    role: string;
}
export interface UserCreate{
    externalId: string;
    name: string;
    email: string;
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(email: string): Promise <User | null>;
}
