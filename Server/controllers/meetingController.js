import nodeSchedule from 'node-schedule';
import pool from '../server.js';
import whatsappClient from './whatsAppclientController.js';

export const scheduleReminders = () => {
  const query = `SELECT * FROM leads WHERE meeting_datetime < NOW() + INTERVAL '2' HOUR + INTERVAL 15 MINUTE;`;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching meetings:', error);
      return;
    }

    console.log(results);

    results.forEach(meeting => {
      const reminderTime = new Date(meeting.meeting_datetime);
      reminderTime.setMinutes(reminderTime.getMinutes() - 10);

      nodeSchedule.scheduleJob(reminderTime, () => {
        const messageBody = 'Reminder: You have a meeting in 10 minutes.';
          // Check if the number starts with '0' and replace it with '972'
  const numberWithCountryCode = meeting.phone.startsWith('0') ? '972' + meeting.phone.substring(1) : meeting.phone;
  
  // Append '@c.us' to make it compatible with WhatsApp
  const toNumber= numberWithCountryCode + '@c.us';
    whatsappClient.sendMessage(toNumber, 'Hello from Hanan , just to remind you that you have meeting with me after 10 min , you will attend? , please answer Yes or No')
        .then(response => console.log('Message sent:', response.id))
        .catch(err => console.error('Sending message failed:', err));
      });
    });
  });
};


// Importing necessary modules
/*
import pool from '../server.js';
import nodeSchedule from 'node-schedule';

import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
/*
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
  scheduleReminders();
});

whatsappClient.initialize();

// Function to schedule reminders
const scheduleReminders = () => {
  const query = `SELECT * FROM leads WHERE meeting_datetime < NOW() + INTERVAL '2' HOUR + INTERVAL 15 MINUTE;`;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching upcoming meetings:', error);
      return;
    }

    results.forEach((meeting) => {
      const messageBody = 'Reminder: You have a meeting in 10 minutes.';
      const toNumber = `whatsapp:${meeting.phone}`; // Make sure the phone number includes the country code
      
      const reminderTime = new Date(meeting.meeting_datetime);
      reminderTime.setMinutes(reminderTime.getMinutes() - 10);

      nodeSchedule.scheduleJob(reminderTime, () => {
        whatsappClient.sendMessage(toNumber, messageBody)
          .then(message => {
            console.log(`Message sent to ${meeting.phone}: ${message.id.toString()}`);
            // Optionally, update the database to mark the reminder as sent
          })
          .catch(messageError => {
            console.error(`Error sending message to ${meeting.phone}:`, messageError);
          });
      });
    });
  });
};
*/
/*
import pool from '../server.js';
import nodeSchedule from 'node-schedule';

//import { Client, LocalAuth } from 'whatsapp-web.js';
//import qrcode from 'qrcode-terminal';



export const scheduleReminders = () => {
    const query = `
    SELECT * FROM leads WHERE meeting_datetime < NOW() + INTERVAL '2' HOUR + INTERVAL 15 MINUTE;`

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching upcoming meetings:', error);
      return;
    }

    console.log(results);
    
    results.forEach((meeting) => {
      const messageBody = 'Reminder: You have a meeting in 10 minutes.';
      const toNumber = meeting.phone;
      console.log(toNumber);

      const reminderTime = new Date(meeting.meeting_datetime);
      console.log(reminderTime);
      reminderTime.setMinutes(reminderTime.getMinutes() - 10);

      console.log( reminderTime);

      nodeSchedule.scheduleJob(reminderTime, () => {

        client.messages.create({
            body: 'Your message text here',
            to: `whatsapp:+972524455873`, // Adjusted recipient number to full international format with country code
            from: 'whatsapp:+14155238886' // Your Twilio WhatsApp sender number in the correct format
          })
          .then(message => {
            console.log(`Message SID: ${message.sid}`);
    
       //   const updateQuery = `UPDATE meetings SET reminder_sent = true WHERE id = ?`;
        //  pool.query(updateQuery, [meeting.id], (updateError, updateResults) => {
        //    if (updateError) {
        //      console.error('Error updating meeting:', updateError);
        //    }
        //  });
        })
        .catch(messageError => {
          console.error(`Error sending message to ${toNumber}:`, messageError);
        });
      });
    });
  });
};
*/