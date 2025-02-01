const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string
const mongoURI = "mongodb+srv://hackathon:AkzBgu0VqVbNifC0@hackathon.2wi6o.mongodb.net/portfolio";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // Add Live Server URLs
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(bodyParser.json());

// Define schema
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

// Create model
const Portfolio = mongoose.model('Portfolio', formSchema);

// Post route for form submission
app.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const newSubmission = new Portfolio({
            name,
            email,
            message
        });

        await newSubmission.save();
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ message: 'Error saving the message.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});