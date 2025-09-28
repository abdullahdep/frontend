const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const mongoURI = 'mongodb://vortfolio:kBWuISOwGXEygCLcQzlW9l7v96pC9llXBG18V7TstaSt4OwM@7aae2054-75ea-41c4-af1b-00b275e46359.nam7.firestore.goog:443/vortfoliofirebase?loadBalanced=true&tls=true&authMechanism=SCRAM-SHA-256&retryWrites=false';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const SubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
}, { timestamps: true });

const Submission = mongoose.model('Submission', SubmissionSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/submit', async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ message: 'Submission failed' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
