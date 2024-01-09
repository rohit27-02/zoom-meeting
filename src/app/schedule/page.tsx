'use client'
import ScheduleMeetingForm from '@/components/schedule-meeting-form';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [meetingDetails, setmeetingDetails] = useState({ id: "", password: "" })
    const [authToken, setauthToken] = useState("")
    const query = useSearchParams();
    
    useEffect(() => {
        setauthToken(query.get("code") || "");
    }, [])

    return (
        <div>
            <ScheduleMeetingForm setmeetinginfo={setmeetingDetails} authtoken={authToken}/>
            <div>
                <h1 className="text-xl">Meeting Details</h1>
                <p>meeting id : {meetingDetails.id}</p>
                <p>meeting password : {meetingDetails.password}</p>
            </div>
        </div>
    );
};

export default Page;