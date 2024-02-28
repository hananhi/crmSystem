import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

// Initialize WhatsApp client with LocalAuth for session persistence
const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

whatsappClient.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

whatsappClient.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

// Listening for messages
whatsappClient.on('message', message => {

  if (message.body.toLowerCase() === 'yes') {

    console.log('User confirmed attendance. Updating the admin...');
    whatsappClient.sendMessage(message.from, 'Thank you for confirming! We look forward to seeing you.');

  } else if (message.body.toLowerCase() === 'no') {

    console.log('User cannot attend. Asking for a new time...');
    whatsappClient.sendMessage(message.from, 'Sorry to hear that. Could you please suggest a new date and time for the meeting? (e.g., DD/MM/YYYY HH:MM)');
   
  } else {
    // Assume the message is a new time suggestion
    console.log(`New time received from user: ${message.body}`);
    const newTime=message.body ;
    // Directly ask for confirmation or further action
    whatsappClient.sendMessage(message.from, 'Thank you. We will check the availability and get back to you.');
  }
  // You can add more conditions here if you want to process other responses
});


whatsappClient.initialize();

export default whatsappClient;
