const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/:barbershopId/view', async (req, res) => {
  const { barbershopId } = req.params;

  try {
    const barbershopView = await prisma.barbershopView.findUnique({
      where: {
        barbershopId: parseInt(barbershopId),
      },
    });

    res.json(barbershopView);
  } catch (error) {
    console.error('Error fetching barbershop view:', error);
    res.status(500).send('An error occurred while fetching barbershop view details.');
  }
});

module.exports = router;
