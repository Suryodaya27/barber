const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Endpoint to get all barber shops
router.get('/getBarbers', async (req, res) => {
  try {
    // Fetch all barber shops from the database
    const barberShops = await prisma.barberShop.findMany();

    // Return the list of barber shops as the response
    res.json(barberShops);
  } catch (error) {
    console.error('Error fetching barber shops:', error);
    res.status(500).json({ error: 'Failed to fetch barber shops' });
  }
});

module.exports = router;
