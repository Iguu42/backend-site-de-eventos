import { FastifyInstance } from "fastify";
import multer from 'fastify-multer';
import multerLib from "../lib/multer.lib";
import { AssetUseCase, UploadAssetUseCase } from "../usecases/asset.usecases";
import { AssetRepositoryPrisma } from "../repositories/asset.repository";
import { AssetCreate } from "../interfaces/asset.interface";

const assetRepository = new AssetRepositoryPrisma();
const assetUseCase = new AssetUseCase(assetRepository);
const uploadAssetUseCase = new UploadAssetUseCase();

export async function assetRoutes(fastify: FastifyInstance) {
    fastify.register(multer.contentParser);
    createAssetRoute(fastify);
    uploadAssetRoute(fastify);
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

function uploadAssetRoute(fastify: FastifyInstance) {
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