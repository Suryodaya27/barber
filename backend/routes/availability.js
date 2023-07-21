const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Endpoint to check session availability for a particular date and barber shop
router.get('/:barbershopId/availability', async (req, res) => {
  const { date } = req.query;
  const { barbershopId } = req.params;

  try {
    // Retrieve sessions for the specified date and barber shop using raw SQL query
    const sessions = await prisma.$queryRaw`
      SELECT * FROM session
      WHERE DATE(date) = ${date} AND barberShopId = ${barbershopId}
    `;

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching session availability:', error);
    res.status(500).send('An error occurred while fetching session availability.');
  }
});

module.exports = router;
