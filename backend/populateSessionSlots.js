const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Define the time slots and date range
const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']; // Add more slots as needed
const startDate = new Date('2023-07-16'); // Start date
const endDate = new Date('2023-08-17'); // End date

// Function to populate the session slots for a specific barber shop
async function populateSessionSlots(barberShopId) {
  try {
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      for (const timeSlot of timeSlots) {
        await prisma.session.create({
          data: {
            date: currentDate, // Pass the Date object directly
            time: timeSlot,
            capacity: 2, // Set the capacity for each time slot
            price: 100,
            barberShop: {
              connect: { id: barberShopId }, // Connect the session to a specific barber shop
            },
          },
        });
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    console.log('Session slots populated successfully for Barber Shop:', barberShopId);
  } catch (error) {
    console.error('Error populating session slots:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to populate the session slots for each barber shop
async function populateAllBarberShopSessionSlots() {
  try {
    // Call the populateSessionSlots function for each barber shop
    // Replace 1, 2, 3, ... with the actual IDs of your barber shops
    await populateSessionSlots(1);
    await populateSessionSlots(2);
    // Add more calls for each barber shop as needed
  } catch (error) {
    console.error('Error populating session slots for all barber shops:', error);
  }
}

// Call the function to populate the session slots for all barber shops
populateAllBarberShopSessionSlots();
