import nodeSchedule from 'node-schedule';
import pool from '../server.js';
import whatsappClient from './whatsAppclientController.js';


export const scheduleReminders = () => {
  const query = `SELECT * FROM leads WHERE meeting_datetime < NOW() + INTERVAL 2 HOUR + INTERVAL 15 MINUTE AND send_reminder = 0;`;

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
  console.log(toNumber);
    whatsappClient.sendMessage(toNumber, 'Hello from Hanan , just to remind you that you have meeting with me after 10 min , you will attend? , please answer Yes or No')
        .then(response => {console.log('Message sent:', response.id);
      
        console.log('Message sent:', response.id);

        // Correct SQL update statement with placeholder for meeting ID
        const query = `UPDATE leads SET send_reminder = true WHERE id = ?`;
        // Execute the query with the meeting ID as the parameter
        console.log(meeting.id);
        pool.query(query, [meeting.id], (err, result) => {
          if (err) {
            console.error('Updating send_reminder failed:', err);
          } else {
            console.log('send_reminder updated successfully for meeting ID:', meeting.id);
          }
      
      })
    })
        .catch(err => console.error('Sending message failed:', err));
      });
    });
  });
};
