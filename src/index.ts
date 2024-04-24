import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({logger: true});

app.listen({
    port:3003,
    },
()=> console.log('Server on port 3003'));