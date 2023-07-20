const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Endpoint to check session availability for a particular date
router.get('/availability', async (req, res) => {
  const { date } = req.query;

  try {
    // Retrieve sessions for the specified date using raw SQL query
    const sessions = await prisma.$queryRaw`
      SELECT * FROM session
      WHERE DATE(date) = ${date}
    `;

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching session availability:', error);
    res.status(500).send('An error occurred while fetching session availability.');
  }
});

module.exports = router;
