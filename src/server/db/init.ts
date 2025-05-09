import { dbService } from '../services/db.service';

const createTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'student') DEFAULT 'student',
      grade INT,
      isPremium BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  for (const query of queries) {
    await dbService.executeQuery(query);
  }
};

export const initDatabase = async () => {
  try {
    await createTables();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};