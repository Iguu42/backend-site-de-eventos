import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { env } from '../env';

export async function jwtValidator(req: any, reply: any) {
  try {

    const token = req.headers['authorization'];
    const jwtUri = env.JWT_PUBLIC_KEY!;


    const jwksClientInstance = jwksClient({
      jwksUri: jwtUri,
    })

    const getKey = (header: any, callback: any) => {
      jwksClientInstance.getSigningKey(header.kid, (err, key: any) => {
        if (err) {
          console.error('Error getting signing key:', err);
          callback(err);
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    };

    const decodedToken: any = await new Promise((resolve, reject) => {
      jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    const externalId = decodedToken.sub;
    req.params.externalId = externalId

    return;

  } catch (error: any) {
    console.error('JWT Verification Error:', error.message);
    throw new Error('Invalid Token');
  }
}