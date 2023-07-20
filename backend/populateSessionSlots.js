const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Define the time slots and date range
const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM']; // Add more slots as needed
const startDate = new Date('2023-07-16'); // Start date
const endDate = new Date('2023-08-17'); // End date

// Function to populate the session slots
async function populateSessionSlots() {
  try {
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      for (const timeSlot of timeSlots) {
        await prisma.session.create({
          data: {
            date: currentDate, // Pass the Date object directly
            time: timeSlot,
            capacity: 2, // Set the capacity for each time slot
            price:100,
          },
        });
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    console.log('Session slots populated successfully.');
  } catch (error) {
    console.error('Error populating session slots:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to populate the session slots
populateSessionSlots();
