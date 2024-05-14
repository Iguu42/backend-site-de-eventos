import S3 from 'aws-sdk/clients/s3';
import path from 'path';
import multerLib from '../lib/multer.lib';
import mime from 'mime';
import fs from 'fs';
import { env } from '../env';
class S3Storage {
    private client: S3;

    constructor(){
        this.client = new S3({
            region: env.AWS_REGION,
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY
        });
    }

    async saveFile(filename: string): Promise<any> {
        const originalPath = path.resolve(multerLib.directory, filename);

        const ContentType = mime.getType(originalPath);

        if(!ContentType){
            throw new Error('File not found');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client.putObject({
            Bucket: env.AWS_BUCKET as string, 
            Key: filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType
        }).promise();

        await fs.promises.unlink(originalPath);
    }
    async deleteFile(filename: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: env.AWS_BUCKET as string,
            Key: filename
        }).promise();
    }
}

export default S3Storage;