// server/routes/stripe.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // use your test secret key

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { lineItems, userId } = req.body;

    // Validate input
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: "Invalid line items" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      metadata: {
        userId: userId, // Store userId for later reference
      },
      success_url: `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/cart`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Optional: Add a webhook handler to process successful payments
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;

      // Here, you can update your database to mark the order as paid
      // For example: await db.collection('orders').updateOne({ userId }, { $set: { paid: true } });

      // You can also clear the user's cart after successful payment
    }

    res.json({ received: true });
  }
);

module.exports = router;
