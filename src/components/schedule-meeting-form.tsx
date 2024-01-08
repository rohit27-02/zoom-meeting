'use client'
import { scheduleMeeting } from '@/actions/schedule-meeting';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

const ScheduleMeetingForm = ({ accesstoken, setmeetinginfo }: {
  accesstoken: string, setmeetinginfo: Dispatch<SetStateAction<{
    id: string;
    password: string;
  }>>
}) => {
  const [meetingDetails, setmeetingDetails] = useState({
    topic: 'Sample Meeting',
    type: 2,
    start_time: Date.now() + 2,
    duration: 60,
    timezone: 'America/New_York',
    agenda: 'Discuss important matters',
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: false,
      mute_upon_entry: false,
      watermark: false,
      use_pmi: false,
      approval_type: 2,
      registration_type: 1,
      audio: 'both',
      auto_recording: 'none',
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setmeetingDetails({
      ...meetingDetails,
      [id]: value,
    });
  }

  const scheduleMeet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await scheduleMeeting({ accesstoken: accesstoken, meetingData: meetingDetails })
    const info =  res.json
    setmeetinginfo(info)
  }
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md  mt-20">
        <h1 className="text-xl font-bold capitalize">Meeting Details</h1>
        <form onSubmit={scheduleMeet}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="" htmlFor="topic">topic</label>
              <input value={meetingDetails.topic} onChange={(e)=>handleChange(e)} id="topic" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="" htmlFor="agenda">agenda</label>
              <input value={meetingDetails.agenda} onChange={(e)=>handleChange(e)} id="agenda" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
            <div>
              <label className="" htmlFor="duration">duration</label>
              <input value={meetingDetails.duration} onChange={(e)=>handleChange(e)} id="duration" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
            </div>

            <div>
              <label className="" htmlFor="start_time">start time</label>
              <input value={meetingDetails.start_time} onChange={(e)=>handleChange(e)} id="start_time" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button type='submit' className="px-6 py-2 leading-5 transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 text-white focus:outline-none focus:bg-gray-600">Schedule</button>
          </div>
        </form>
      </section>


    </div>
  );
};

export default ScheduleMeetingForm;