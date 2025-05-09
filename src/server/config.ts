import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  database: {
    host: process.env.DB_HOST || 'gateway01.us-west-2.prod.aws.tidbcloud.com',
    port: parseInt(process.env.DB_PORT || '4000'),
    user: process.env.DB_USER || '4X9NB55hrn1TRiV.root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'test',
    ssl: {
      rejectUnauthorized: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  }
};