const express = require('express');
const twilio = require('twilio');
const openai = require('openai');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Twilio Credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioClient = twilio(accountSid, authToken);

// OpenAI Credentials
const openaiApiKey = 'YOUR_OPENAI_API_KEY';
const openaiClient = new openai.OpenAIAPI({ key: openaiApiKey });

// Endpoint to handle Twilio transcription callback
app.post('/transcription-callback', async (req, res) => {
  const transcribedText = req.body.TranscriptionText;

  // Process transcribed text with GPT-3.5
  const gptResponse = await openaiClient.complete({
    engine: 'text-davinci-002',
    prompt: transcribedText,
    max_tokens: 100,
  });

  const gptOutput = gptResponse.choices[0].text.trim();

  // Use Twilio TTS to convert GPT response into voice
  const ttsResponse = await twilioClient.synthesizeSpeech({
    text: gptOutput,
    voice: 'alice',
    language: 'en-US',
    twiml: true,
  });

  // Generate TwiML to play synthesized voice
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say({ voice: 'alice' }, ttsResponse);

  res.type('text/xml');
  res.send(twiml.toString());
});

// Endpoint to initiate the call
app.post('/initiate-call', async (req, res) => {
  try {
    // Initiate Twilio call with transcription callback
    const call = await twilioClient.calls.create({
      url: 'http://your-ngrok-url/transcription-callback',
      to: '+1234567890', // Replace with recipient's number
      from: '+0987654321', // Replace with your Twilio number
      transcriptionCallback: 'http://your-ngrok-url/transcription-callback',
    });

    console.log(`Call initiated: ${call.sid}`);
    res.status(200).send(`Call initiated: ${call.sid}`);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error initiating call');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});