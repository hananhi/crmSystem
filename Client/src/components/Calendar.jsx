import React, { useState , useEffect} from 'react'
import Fullcalendar from"@fullcalendar/react"
 import dayGridPlugin from"@fullcalendar/daygrid"
 import timeGridPlugin from"@fullcalendar/timegrid"
 import interactionPlugin from"@fullcalendar/interaction"
 import { IoCloseCircle } from "react-icons/io5";

 import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export default function Calendar() {

    const [events, setEvents] = useState([]);
    const [updateMeeting, setUpdateMeeting]=useState(false);
    const [meetingID,setMeetingId]=useState();
    const[EditMeeting,setEditMeeting]=useState(false);

   
    const[meetingStartTime,setMeetingStartTime]=useState('');
    const[meetingDuration,setMeetingDuration]=useState('');
    const[meetingEndTime,setMeetingEndTime]=useState('');


    const [t,i18n]=useTranslation('global')

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
        id:meeting.id,
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


    function handleEventClick(clickInfo) {
      const meetingId=clickInfo.event.id;
      
      setMeetingId(meetingId);
      setUpdateMeeting(true);
    }



async function cancelMeeting() {

  console.log('iam in cancel',meetingID);
  
  try {
    const response = await fetch(`https://crm3-vj7r.onrender.com/meetings/${meetingID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
     
      console.log(response);
      window.location.reload();
      console.log('updated successfully ');
    } else {
      console.error('Failed to delete data.');
    }
  } catch (error) {
    console.error('Error deleting', error);
  }

  }

  async function changeTime(event) {
    event.preventDefault();
    console.log('iam in change item',meetingID);
   
    const { meetingStartTime , meetingDuration, meetingEndTime} = event.target.elements;
    /*
    try {
      const response = await fetch(`https://crm3-vj7r.onrender.com/meetings/${meetingID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        meetingStartTime : meetingStartTime.value,
        meetingDuration: meetingDuration.value,
        meetingEndTime: meetingEndTime.value
        }),
      });
  
      if (response.ok) {
       
        console.log(response);
        window.location.reload();
        console.log('deleted successfully.');
      } else {
        console.error('Failed to delete data.');
      }
    } catch (error) {
      console.error('Error deleting', error);
    }
  */
    }

  return (
    <div className='w-full lg:max-w-[90vw] ml-0 lg:ml-[70px] mt-5 lg:mt-[30px]'>
    <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        headerToolbar={{
            start: 'title',
            center: 'prev,next',
            end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        slotMinTime="08:00:00" // Calendar starts at 8am
        slotMaxTime="20:00:00"
        height='auto' // Adjust height for responsive design
        contentHeight='auto'
        aspectRatio={1.35} // Adjust according to needs, affects the width-to-height ratio
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
    />
{updateMeeting && (
        <div>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <form className="bg-white rounded-lg p-8 m-4 max-w-lg w-full space-y-4 relative">
              <IoCloseCircle color='red' className='absolute top-0 right-0 mt-4 mr-4 cursor-pointer size-6' onClick={() => setUpdateMeeting(false)}/>
              <div className="text-lg font-semibold text-center text-teal-500">{t('calendar.updateMeeting')}</div>
              <div className='flex justify-evenly'>
                <button className='text-teal-500 border border-teal-500 rounded-md font-bold p-1' onClick={setEditMeeting(true)}>{t('calendar.changeTime')}</button>
                {EditMeeting && <div>
                  
                <input type="datetime-local" name="startDateTime" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" value={meetingStartTime} onChange={(e) => setMeetingStartTime(e.target.value)}/>

                <input type="number" name="duration" placeholder={t('details.durationInMinutes')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500" value={meetingDuration} onChange={(e) => setMeetingDuration(e.target.value)}/>

                <input type="datetime-local" name="endDateTime" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" value={meetingEndTime} readOnly/>

                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" onClick={changeTime}>
                  {t('details.submit')}
                </button>
                  
                   </div>}
                <button type='button' className='border border-red-600 rounded-md text-red-600 font-bold p-1' onClick={cancelMeeting}>{t('calendar.cancelMeeting')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}