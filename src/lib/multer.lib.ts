import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import multer from 'fastify-multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        }},
    ),
};