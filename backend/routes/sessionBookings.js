const express = require("express");
const { PrismaClient } = require("@prisma/client");
const razorpay = require("razorpay");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const rzp = new razorpay({
  key_id: "rzp_test_eE0JGBShNpxEux",
  key_secret: "J4dhUIhJZQ6mK4ujwGLKtE1r",
});

// Middleware to parse webhook payload
router.use(bodyParser.raw({ type: "application/json" }));

// Endpoint to book a session
router.post("/book-session", verifyToken, async (req, res) => {
  const { sessionId } = req.body;
  const customerId = req.userId;

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
      return res.status(404).send("Session not found or fully booked.");
    }

    // Generate the order amount for Razorpay (in paisa or smallest currency unit)
    const orderAmount = session.price * 100;

    // Create an order in Razorpay
    const razorpayOrder = await rzp.orders.create({
      amount: orderAmount,
      currency: "INR",
      receipt: "receipt_id", // Replace with your custom receipt ID
      // Add other order details as needed
    });

    // Create a new booking with initial status as 'pending'
    const booking = await prisma.booking.create({
      data: {
        sessionId,
        customerId,
        orderId: razorpayOrder.id, // Store the Razorpay order ID in your database
        orderAmount, // Store the order amount in your database
        status: "pending", // Initial booking status
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error booking session:", error);
    res.status(500).send("An error occurred while booking the session.");
  }
});

// Update the booking status

// Webhook endpoint to handle payment confirmation
// Webhook endpoint to handle payment confirmation
router.post('/razorpay-webhook', async (req, res) => {
    const { event, payload } = req.body;
  
    if (event === 'payment.captured') {
      const orderId = payload.order.id;
  
      try {
        // Find the booking based on the orderId
        const booking = await prisma.booking.findFirst({
          where: {
            orderId,
          },
        });
  
        if (!booking) {
          return res.status(404).send('Booking not found.');
        }
  
        // Update the booking status to 'completed'
        const updatedBooking = await prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: 'completed',
          },
        });
  
        // Decrease the session capacity by 1
        await prisma.session.update({
          where: {
            id: updatedBooking.sessionId,
          },
          data: {
            capacity: {
              decrement: 1,
            },
          },
        });
  
        // Send the success response to Razorpay
        res.status(200).send('Payment success');
      } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).send('An error occurred while updating the booking status.');
      }
    } else {
      // For other events, simply send the success response to Razorpay
      res.status(200).send('Event received');
    }
  });
  
module.exports = router;
