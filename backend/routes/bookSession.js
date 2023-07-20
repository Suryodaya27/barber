const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Endpoint to book a session
router.post('/book-session',verifyToken , async (req, res) => {
  const { sessionId} = req.body;
  const  customerId  = req.userId;

  try {
    // Check if the session exists and has available capacity
    const session = await prisma.session.findFirst({
      where: {
        id: sessionId,
        capacity: {
          gt: 0, // Ensure there is remaining capacity
        },
      },
    });

    if (!session) {
      return res.status(404).send('Session not found or fully booked.');
    }

    // Create a new booking
    const booking = await prisma.booking.create({
      data: {
        sessionId,
        customerId,
      },
    });

    // Decrease the session capacity by 1
    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        capacity: session.capacity - 1,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).send('An error occurred while booking the session.');
  }
});

module.exports = router;
