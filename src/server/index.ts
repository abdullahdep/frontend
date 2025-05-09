import express from 'express';
import cors from 'cors';
import { initDatabase } from './db/init';
import { authService } from './services/auth.service';

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();