import 'dotenv/config';
import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from './routes/user.routes';
import { eventRoutes } from "./routes/event.routes";
import { webhookClerk } from "./routes/clerkWebhook.routes";
import { purchaseOrderRoutes } from "./routes/purchaseOrder.routes";

const app: FastifyInstance = fastify({ logger: true });
const port = parseInt(process.env.PORT as string);

app.register(userRoutes, {
    prefix: '/users',
});

app.register(eventRoutes, {
    prefix: '/events'
})

app.register(webhookClerk, {
    prefix: '/clerk'
})
app.register(purchaseOrderRoutes, {
    prefix: '/purchaseorder'
})

app.listen({
    port: port || 3003,
},
    () => console.log(`Server on port ${port}`));