// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Configure your routes and middleware here

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



// add prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Routes
const signup = require('./routes/signup');
const login = require('./routes/login');
const bookSession = require('./routes/bookSession');
const bookings = require('./routes/bookings');
const availability = require('./routes/availability');
const deleteBooking = require('./routes/deleteBooking')

app.use('/api/signup', signup);
app.use('/api/login', login);
app.use('/api/' , bookSession);
app.use('/api/' , bookings);
app.use('/api/' , availability);
app.use('/api/',deleteBooking);

const port = 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
