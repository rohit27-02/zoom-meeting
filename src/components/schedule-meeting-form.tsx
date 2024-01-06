'use client'
import { useState } from 'react';

interface MeetingDetails {
    topic: string;
    start_time: string;
    duration: string;
    type: string;
}

const ScheduleMeetingForm: React.FC = () => {
    const [meetingDetails, setMeetingDetails] = useState<MeetingDetails>({
        topic: '',
        start_time: '',
        duration: '',
        type: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingDetails({
            ...meetingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleScheduleMeeting = async () => {
        try {
            console.log(meetingDetails)
            const response = await fetch('/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingDetails),
            });
            console.log(response)
            // Add any additional logic or UI updates upon successful scheduling
        } catch (error) {
            console.error('Error scheduling meeting:', error);
            // Handle error and display appropriate messages to the user
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-600">
            Topic:
          </label>
          <input
            id="topic"
            name="topic"
            type="text"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            value={meetingDetails.topic}
            onChange={handleInputChange}
          />
        </div>
      
        <div className="mb-4">
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-600">
            Start Time:
          </label>
          <input
            id="start_time"
            name="start_time"
            type="datetime-local"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            value={meetingDetails.start_time}
            onChange={handleInputChange}
          />
        </div>
      
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-600">
            Duration (minutes):
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            value={meetingDetails.duration}
            onChange={handleInputChange}
          />
        </div>
      
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-600">
            Type (1 for Instant, 2 for Scheduled):
          </label>
          <input
            id="type"
            name="type"
            type="number"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            value={meetingDetails.type}
            onChange={handleInputChange}
          />
        </div>
      
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
          onClick={handleScheduleMeeting}
        >
          Schedule Meeting
        </button>
      </div>
      

    );
};

export default ScheduleMeetingForm;
