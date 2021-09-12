const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const connectDB = require('./config/db');

// connect database

connectDB();

const app = express();


app.use(express.json());


app.use('/api/auth',require('./routes/auth')); 



const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
})