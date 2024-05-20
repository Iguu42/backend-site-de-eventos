export interface Producer {
    id: string;
    name: string;
    email: string;
    description: string | null;
    imageUrl: string;
}

export interface ProducerCreate {
    name: string;
    email: string;
    description: string | null;
    imageUrl: string;
}

export interface ProducerUpdate {
    id: string;
    name: string;
    email: string;
    description: string | null;
    imageUrl: string;
}

export interface ProducerRepository {
    createProducer(data: ProducerCreate): Promise<ProducerCreate>;
    deleteProducer(id: string): Promise<void>;
    updateProducer(data: ProducerUpdate): Promise<ProducerUpdate>;
    getAllProducers(): Promise<Producer[]>;
    getProducerById(id: string): Promise<Producer | null>;
}