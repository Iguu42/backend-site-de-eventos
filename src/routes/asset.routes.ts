import { FastifyInstance } from "fastify";
import multer from 'fastify-multer';
import multerLib from "../lib/multer.lib";
import { AssetUseCase, UploadAssetUseCase } from "../usecases/asset.usecases";
import { AssetRepositoryPrisma } from "../repositories/asset.repository";
import { AssetCreate, AssetUpdate } from "../interfaces/asset.interface";

const assetRepository = new AssetRepositoryPrisma();
const assetUseCase = new AssetUseCase(assetRepository);
const uploadAssetUseCase = new UploadAssetUseCase();

export async function assetRoutes(fastify: FastifyInstance) {
    fastify.register(multer.contentParser);
    createAssetRoute(fastify);
    deleteAssetRoute(fastify);
    updateAssetRoute(fastify);
    getAssetByIdRoute(fastify);
    getAllAssetsByEventIdRoute(fastify);

    uploadAssetS3Route(fastify);
    deleteAssetS3Route(fastify);
}

function createAssetRoute(fastify: FastifyInstance) {
    fastify.post<{ Body: AssetCreate }>('/', async (req, reply) => {
        const { eventId, type, url, description } = req.body;
        try {
            const data = await assetUseCase.create({ eventId, type, url, description});
            reply.code(201).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function deleteAssetRoute(fastify: FastifyInstance) {
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            await assetUseCase.delete(id);
            reply.code(204).send();
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}
function updateAssetRoute(fastify: FastifyInstance) {
    fastify.patch<{ Body: AssetUpdate, Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        const { type, url, description } = req.body;
        try {
            const data = await assetUseCase.update({ id, type, url, description });
            reply.code(200).send(data);
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}
function getAssetByIdRoute(fastify: FastifyInstance) {
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await assetUseCase.getAssetById(id);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}
function getAllAssetsByEventIdRoute(fastify: FastifyInstance) {
    fastify.get<{ Params: { eventId: string } }>('/event/:eventId', async (req, reply) => {
        const { eventId } = req.params;
        try {
            const data = await assetUseCase.getAllAssetsByEventId(eventId);
            reply.code(200).send(data);
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}

function uploadAssetS3Route(fastify: FastifyInstance) {
    const upload = multer(multerLib);
    fastify.post('/upload',{preHandler: upload.single("image")}, async (req, reply) => {
        const { file } = req as any; 
        try {
            const data = await uploadAssetUseCase.execute(file);
            const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${file.filename}`;
            reply.code(201).send({url});
        } catch (error) {
            reply.code(400).send(error);
        }
    });
}

function deleteAssetS3Route(fastify: FastifyInstance) {
    fastify.delete<{Params: {filename: string}}>('/upload/:filename', async (req, reply) => {
        const { filename } = req.params;
        console.log("TESTE",filename);
        try {
            await uploadAssetUseCase.delete(filename);
            reply.code(204).send();
        } catch (error) {
            reply.code(404).send(error);
        }
    });
}