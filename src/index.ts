import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from './routes/user.routes';
import { eventRoutes } from "./routes/event.routes";

const app: FastifyInstance = fastify({logger: true});

app.register(userRoutes,{
    prefix: '/users',
});

app.register(eventRoutes, {
    prefix: '/events'
})
app.listen({
    port:3003,
    },
()=> console.log('Server on port 3003'));