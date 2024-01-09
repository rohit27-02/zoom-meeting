'use client'
import { getaccessToken } from '@/actions/get-access-token';
import ScheduleMeetingForm from '@/components/schedule-meeting-form';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [meetingDetails, setmeetingDetails] = useState({ id: "", password: "" })
    const [accesstoken, setaccesstoken] = useState("");
    const [authToken, setauthToken] = useState("")
    const query = useSearchParams();

    const accessToken = async () => {
        const at = await getaccessToken({ authToken: authToken })
        setaccesstoken(at)
    }

    useEffect(() => {
        setauthToken(query.get("code") || "");
    }, [])
    
    useEffect(() => {
        accessToken
    }, [authToken])

    return (
        <div>
            <ScheduleMeetingForm setmeetinginfo={setmeetingDetails} accesstoken={accesstoken} />
            <div>
                <h1 className="text-xl">Meeting Details</h1>
                <p>meeting id : {meetingDetails.id}</p>
                <p>meeting password : {meetingDetails.password}</p>
            </div>
        </div>
    );
};

export default Page;