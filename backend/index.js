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
const whatsappFromNumber = 'whatsapp:+18314806294';
app.post("/api/twilio-send-whatsappmessage", async (req, res) => {
  const { to, whatsappmessage } = req.body;

  if (!to || !whatsappmessage) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required parameters: to and whatsappmessage' 
    });
  }

  try {
    // Format the recipient's number for WhatsApp
    const whatsappTo = `whatsapp:${to}`; // Format: whatsapp:+1234567890

    // Log the numbers being used (for debugging)
    console.log('Sending from:', whatsappFromNumber);
    console.log('Sending to:', whatsappTo);

    const response = await client.messages.create({
      from: whatsappFromNumber, // Use the sandbox number
      to: whatsappTo,
      body: whatsappmessage
    });

    console.log('WhatsApp message sent successfully:', response.sid);
    res.json({ 
      success: true, 
      messageSid: response.sid,
      status: response.status
    });
  } catch (error) {
    console.error('Detailed error:', {
      status: error.status,
      code: error.code,
      message: error.message,
      moreInfo: error.moreInfo
    });

    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code,
      moreInfo: error.moreInfo
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));