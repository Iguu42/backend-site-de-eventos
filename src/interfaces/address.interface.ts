export interface Address{
    id: string;
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface AddressCreate{
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface AddressRepository {
    create(data: AddressCreate): Promise<Address>;
    getAddressById(id: string): Promise<Address | null>;
}

