import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT,
  create_token_secrate: process.env.CREATE_TOKEN_SECRATE,
  expires_token_time: process.env.EXPIRES_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
};
