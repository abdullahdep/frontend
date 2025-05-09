import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
  port: 4000,
  user: '4X9NB55hrn1TRiV.root',
  password: '46A9adHuYIiNNbMy',
  database: 'test',
  ssl: {
    rejectUnauthorized: true
  }
});

export default pool;