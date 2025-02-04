const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { VoiceResponse } = require("twilio").twiml;

const app = express();
const PORT = process.env.PORT || 5000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

app.post('/api/twilio-call', async (req, res) => {
  const { to, message } = req.body;

  try {
    const call = await client.calls.create({
      from: fromNumber,
      to: to,
      twiml: `<Response><Say>${message}</Say></Response>`,
    });
    console.log(call.sid);
    
    res.status(200).json({ sid: call.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));