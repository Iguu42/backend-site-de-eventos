import Bull, { Job } from "bull";
import { env } from '../env';
import { PurchaseOrderUseCase } from "../usecases/purchaseOrder.usecases";

interface QueueConfig {
  name: string;
  processJob: (job: Job) => Promise<any>;
};

const queuesConfig: QueueConfig[] = [
  {
    name: 'purchaseOrder',
    processJob: async (job) => {
      const purchaseOrderUseCase = new PurchaseOrderUseCase();
      console.log('Processing job:', job.data);
      return await purchaseOrderUseCase.create(job.data);
    }
  }
  // Adicione outras filas aqui
];

const queues: Record<string, Bull.Queue> = {};

export function createQueues(): void {
  for (const queueConfig of queuesConfig) {
    const { name, processJob } = queueConfig;
    queues[name] = new Bull(name, {
      redis: {
        host: env.REDIS_HOST as string,
        port: parseInt(env.REDIS_PORT as string),
        password: env.REDIS_PASSWORD as string,
        username: env.REDIS_USERNAME as string,
        
      }
    });
    queues[name].process(processJob);
  };
};

export function getQueue(name: string): Bull.Queue {
  if (!queues[name]) {
    throw new Error(`Queue ${name} does not exist.`);
  };

  return queues[name];
};
