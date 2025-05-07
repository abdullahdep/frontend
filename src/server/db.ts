import mysql from 'mysql2/promise';
import { config } from './config';

export const pool = mysql.createPool(config.database);

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}