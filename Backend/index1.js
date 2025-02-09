require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend requests

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID, 
  process.env.TWILIO_AUTH_TOKEN
);

// Route: Send OTP
app.post("/api/twilio-send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone number
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Request OTP via Twilio Verify
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ 
        to: phone, 
        channel: "sms" 
      });

    res.json({ 
      message: "OTP Sent", 
      sid: verification.sid 
    });

  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route: Verify OTP
app.post("/api/twilio-verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validate input
    if (!phone || !otp) {
      return res.status(400).json({ error: "Phone number and OTP are required" });
    }

    // Check OTP via Twilio Verify
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verification_checks.create({ 
        to: phone, 
        code: otp 
      });

    // Determine verification status
    if (verificationCheck.status === "approved") {
      res.json({ 
        message: "OTP Verified", 
        verified: true 
      });
    } else {
      res.status(400).json({ 
        error: "Invalid OTP", 
        verified: false 
      });
    }

  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});