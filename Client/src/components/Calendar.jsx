import React, { useState , useEffect} from 'react'
import Fullcalendar from"@fullcalendar/react"
 import dayGridPlugin from"@fullcalendar/daygrid"
 import timeGridPlugin from"@fullcalendar/timegrid"
 import interactionPlugin from"@fullcalendar/interaction"

export default function Calendar() {

    const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('https://crm2-bw3d.onrender.com/meetings');
    
      const data = await response.json();
console.log(data);
      // Assuming 'data' is an array of meeting objects
      const formattedEvents = data.map(meeting => ({
        title: meeting.title,
        start: meeting.start,
        end: meeting.end
      }));

      setEvents(formattedEvents);
    };

    fetchEvents();
  }, []);
  return (
    <div className='max-w-[90vw] ml-[70px] mt-[30px]' >
        
        <Fullcalendar  plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
            start: 'title',
            center:'prev,next',
            end:'dayGridMonth,timeGridWeek,timeGridDay',
        } 
        }
        
        height={'95vh'}
        events={events}
       />

    </div>
  )
}
