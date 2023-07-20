// routes/sessions.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// API route to cancel a session
router.delete('/cancel/:bookingId', async (req, res) => {
  const bookingId = parseInt(req.params.bookingId);

  try {
    // Find the booking with the specified booking ID
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!booking) {
      // Booking with the given ID not found
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Get the session ID associated with the booking
    const sessionId = booking.sessionId;

    // Find the session with the specified session ID
    const session = await prisma.session.findUnique({ where: { id: sessionId } });

    if (!session) {
      // Session with the given ID not found
      return res.status(404).json({ error: 'Session not found' });
    }

    // Increment the capacity of the session by 1
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: { capacity: session.capacity + 1 },
    });

    // Delete the booking using Prisma
    await prisma.booking.delete({ where: { id: bookingId } });

    // Respond with a success message
    res.json({ message: 'Session canceled successfully' });
  } catch (error) {
    console.error('Error canceling session:', error);
    res.status(500).json({ error: 'Failed to cancel session. Please try again.' });
  }
});

module.exports = router;
