const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./utils/db');
const { errorHandler } = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));