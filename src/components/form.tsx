'use client'
import { getaccessToken } from '@/actions/get-access-token';
import { scheduleMeeting } from '@/actions/schedule-meeting';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ZoomMtg } from "@zoomus/websdk";

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const Form = () => {
    const [meetinginfo, setmeetinginfo] = useState({ id: "", password: "", joinurl: "", starturl: "" })
    const query = useSearchParams();
    const [token, settoken] = useState("");
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
        console.log("auth token", authToken)
        const at = await getaccessToken({ authToken: authToken })
        console.log("access token", at)
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

    const fetchZak = async (authToken: string) => {
        const zakReq = await fetch(
            `https://api.zoom.us/v2/users/me/token?type=zak`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken || "ixPfTrr5codJbC7pJkTQ8mf9-N7MIR9sQ"
                        }`,
                },
            }
        );

        const { token } = await zakReq.json();
        console.log("zak token : ", token);
        if (token) {
            settoken(token);
        }
    };

    const joinMeeting = async () => {
        try {
            if (typeof document != undefined) {
                const rootElement = document.getElementById("zmmtg-root");
                if (rootElement) {
                    rootElement.style.display = "block";
                }
            }
            const signature = ZoomMtg.generateSDKSignature({ sdkKey: "0RG_LglYTBS2kvwVDiAYw", sdkSecret: "R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingNumber: meetinginfo.id.toString(), role: "0" })

            if (ZoomMtg.init) {
                ZoomMtg.init({
                    leaveUrl: process.env.NEXT_PUBLIC_URL || "",
                    isSupportAV: true,
                    success: (success: any) => {
                        console.log(success);

                        if (ZoomMtg.join) {
                            ZoomMtg.join({
                                sdkKey: "0RG_LglYTBS2kvwVDiAYw",
                                signature: signature,
                                meetingNumber: meetinginfo.id,
                                userName: "rahul",
                                success: (success: any) => {
                                    console.log(success);
                                },
                                error: (error: any) => {
                                    console.log(error);
                                },
                            });
                        }
                    },
                });
            }
        } catch (error) {
            console.error("Error joining Zoom meeting:", error);
        }
    };

    const startMeeting = async () => {
        await fetchZak
        try {
            if (ZoomMtg.init) {
                ZoomMtg.init({
                    leaveUrl: process.env.NEXT_PUBLIC_URL || "",
                    success: (success: any) => {
                        if (typeof document != undefined) {
                            const rootElement = document.getElementById("zmmtg-root");
                            if (rootElement) {
                                rootElement.style.display = "block";
                            }
                        }
                        console.log(success);
                        const signature = ZoomMtg.generateSDKSignature({ sdkKey: "0RG_LglYTBS2kvwVDiAYw", sdkSecret: "GvMitwI9uXuA0GGP4kEe6wTueSBgN347", meetingNumber: meetinginfo.id.toString(), role: "1" })
                        if (ZoomMtg.join) {
                            ZoomMtg.join({
                                passWord: meetinginfo.password,
                                sdkKey: "0RG_LglYTBS2kvwVDiAYw",
                                signature: signature,
                                meetingNumber: meetinginfo.id,
                                userName: "rahul",
                                zak: token,
                                success: (success: any) => {
                                    console.log(success);
                                },
                                error: (error: any) => {
                                    console.log(error);
                                },
                            });
                        }
                    },
                    error: (error: any) => {
                        console.log(error);
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };


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
                <p>start url : {meetinginfo.starturl}</p>
                <p>join url : {meetinginfo.joinurl}</p>
            </div>
            <button onClick={startMeeting}>Start Meeting</button>
            <button onClick={joinMeeting}>Join Meeting</button>
        </div>
    );
};

export default Form;