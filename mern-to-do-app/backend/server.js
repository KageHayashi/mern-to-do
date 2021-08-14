const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/mern-to-do');

// Await connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("MongoDB database connected.")
});

// Add routes
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
app.use('/tasks/', tasksRouter);
app.use('/users/', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})