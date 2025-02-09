const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

// Endpoint for making voice calls
app.post('/api/twilio-call', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing required parameters: to and message' });
  }

  try {
    const call = await client.calls.create({
      from: fromNumber,
      to: to,
      twiml: `<Response><Say><![CDATA[${message}]]></Say></Response>`,
    });
    
    console.log('Voice call initiated:', call.sid);
    res.status(200).json({ sid: call.sid });
  } catch (error) {
    console.error('Error making voice call:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for sending SMS messages
app.post('/api/twilio-message', async (req, res) => {
  const { to, messageText } = req.body;  // Changed from 'message' to 'messageText'

  if (!to || !messageText) {
    return res.status(400).json({ error: 'Missing required parameters: to and messageText' });
  }

  try {
    const twilioMessage = await client.messages.create({  // Changed variable name to 'twilioMessage'
      body: messageText,
      from: fromNumber,
      to: to
    });
    
    console.log('SMS message sent:', twilioMessage.sid);
    res.status(200).json({ sid: twilioMessage.sid });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: error.message });
  }
});





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
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));