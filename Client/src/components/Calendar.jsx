import React, { useState , useEffect} from 'react'
import Fullcalendar from"@fullcalendar/react"
 import dayGridPlugin from"@fullcalendar/daygrid"
 import timeGridPlugin from"@fullcalendar/timegrid"
 import interactionPlugin from"@fullcalendar/interaction"

export default function Calendar() {

    const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('https://crm3-vj7r.onrender.com/meetings');
    
      const data = await response.json();
console.log(data);
      // Assuming 'data' is an array of meeting objects
      const formattedEvents = data.map(meeting => ({
        title: meeting.title,
        start: meeting.start,
        end: meeting.end,
        backgroundColor: '#ff9f89'
      }));

      setEvents(formattedEvents);
    };

    fetchEvents();
  }, []);

    // Custom rendering function for events
    const renderEventContent = (eventInfo) => {
        return (
          <div className="bg-teal-500 text-white rounded p-1 text-sm">
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </div>
        );
      };

  return (
    <div className='max-w-[90vw] ml-[70px] mt-[30px]' >
        
        <Fullcalendar  plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
        initialView={'timeGridWeek'}
        headerToolbar={{
            start: 'title',
            center:'prev,next',
            end:'dayGridMonth,timeGridWeek,timeGridDay',
        } 
        }
        slotMinTime="08:00:00" // Calendar starts at 8am
        slotMaxTime="20:00:00"
        height={'95vh'}
        events={events}
        eventContent={renderEventContent}
       />

    </div>
  )
}
