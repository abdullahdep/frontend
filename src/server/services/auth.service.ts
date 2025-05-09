import bcrypt from 'bcryptjs';
import { dbService } from './db.service';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'student';
  grade?: number;
  isPremium: boolean;
}

export const authService = {
  async createUser(userData: Omit<User, 'id' | 'isPremium'>): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const query = `
      INSERT INTO users (name, email, password, role, grade)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await dbService.executeQuery<any>(query, [
      userData.name,
      userData.email,
      hashedPassword,
      userData.role,
      userData.grade || null
    ]);
    
    const { password, ...userWithoutPassword } = {
      id: result.insertId,
      ...userData,
      isPremium: false
    };
    
    return userWithoutPassword;
  },

  async login(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [user] = await dbService.executeQuery<User[]>(query, [email]);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};