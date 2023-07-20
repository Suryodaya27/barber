const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();


// Endpoint to get user bookings
router.get('/bookings', verifyToken, async (req, res) => {
    const { customerId } = req; // Get customerId from the authenticated user
  
    try {
      // Retrieve the bookings for the customer
      const bookings = await prisma.booking.findMany({
        where: {
          customerId,
        },
        include: {
          session: true, // Include the associated session details
        },
      });
  
      res.json(bookings);
    } catch (error) {
      console.error('Error retrieving bookings:', error);
      res.status(500).send('An error occurred while retrieving bookings.');
    }
  });
  
  module.exports = router;