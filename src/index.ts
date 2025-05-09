import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route handler
app.get('/', async (req: express.Request, res: express.Response) => {
  try {
    return res.json({ message: 'Server is running' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;