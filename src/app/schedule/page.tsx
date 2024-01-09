'use client'
import { getaccessToken } from '@/actions/get-access-token';
import { scheduleMeeting } from '@/actions/schedule-meeting';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

const Page = () => {
    const [meetinginfo, setmeetinginfo] = useState({ id: "", password: "" })
    const query = useSearchParams();
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
    const [accesstoken, setaccesstoken] = useState("")

    const accessToken = async (authToken: string) => {
        console.log("auth token",authToken)
        const at = await getaccessToken({ authToken: authToken })
        console.log("access token",at)
        setaccesstoken(at)
    }

    useEffect(() => {
        const authToken = query.get("code") || ""
        accessToken(authToken)
    }, [query])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setmeetingDetails({
            ...meetingDetails,
            [id]: value,
        });
        console.log(meetingDetails)
    }

    const scheduleMeet = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await scheduleMeeting({ accesstoken: accesstoken, meetingData: meetingDetails })
        const info = res.json
        console.log(info)
        setmeetinginfo(info)
    }


    return (
        <div>
            <section className="max-w-4xl z-[9999] p-6 mx-auto rounded-md shadow-md  mt-20">
                <h1 className="text-xl font-bold capitalize">Meeting Details</h1>
                <form onSubmit={scheduleMeet}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="" htmlFor="topic">topic</label>
                            <input value={meetingDetails.topic} onChange={(e) => handleChange(e)} id="topic" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="" htmlFor="agenda">agenda</label>
                            <input value={meetingDetails.agenda} onChange={(e) => handleChange(e)} id="agenda" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                        <div>
                            <label className="" htmlFor="duration">duration</label>
                            <input value={meetingDetails.duration} onChange={(e) => handleChange(e)} id="duration" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="" htmlFor="start_time">start time</label>
                            <input value={meetingDetails.start_time} onChange={(e) => handleChange(e)} id="start_time" type="datetime-local" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type='submit' className="px-6 py-2 leading-5 transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 text-white focus:outline-none focus:bg-gray-600">Schedule</button>
                    </div>
                </form>
            </section>
            <div>
                <h1 className="text-xl">Meeting Details</h1>
                <p>meeting id : {meetinginfo.id}</p>
                <p>meeting password : {meetinginfo.password}</p>
            </div>
        </div>
    );
};

export default Page;