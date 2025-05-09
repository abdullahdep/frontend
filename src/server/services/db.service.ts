import mysql from 'mysql2/promise';
import { config } from '../config';

const pool = mysql.createPool(config.database);

export const dbService = {
  async executeQuery<T>(query: string, params?: any[]): Promise<T> {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query(query, params);
      return results as T;
    } finally {
      connection.release();
    }
  }
};