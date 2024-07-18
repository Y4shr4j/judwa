const mongoose = require("mongoose");
require('dotenv').config(); // Ensure environment variables are loaded

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
