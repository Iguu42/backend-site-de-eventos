import Bull from "bull";
import 'dotenv/config';
import { PurchaseOrderUseCase } from "../usecases/purchaseOrder.usecases";

const queue = new Bull('purchaseOrder', {
  redis: {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string)
  }
});

queue.process(async (job) => {
    const purchaseOrderUseCase = new PurchaseOrderUseCase();
    console.log('Processing job:', job.data);
    return await purchaseOrderUseCase.create(job.data);
});

export default queue;
