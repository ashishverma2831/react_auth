const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const connect_DB = require('./config/connect_db');

const app = express();
const PORT = process.env.PORT || 3000;


// Routes
const UserRoutes = require('./routes/UserRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, async () => {
    // Connect to MongoDB
    await connect_DB();
    console.log(`Server is running on port ${PORT}`);
});