'use client'
import { getaccessToken } from "@/actions/get-access-token";
import { scheduleMeeting } from "@/actions/schedule-meeting";
import { ZoomMtg } from "@zoomus/websdk";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ScheduleMeetingForm from "./schedule-meeting-form";

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const ZoomMeeting = () => {
    const router = useRouter();
    const query = useSearchParams();
    const [authToken, setauthToken] = useState("")
    const [token, settoken] = useState("");
    const [accesstoken, setaccesstoken] = useState("");
    const [meetingDetails, setmeetingDetails] = useState({ id: "", password: "" })
    const [showForm, setshowForm] = useState(false)

    useEffect(() => {
        setshowForm(true)
        if(authToken){
            accessToken
        }
    }, [authToken])


    // useEffect(() => {
    //     console.log("access token : ", authToken);
    //     if (fetchZak) {
    //         fetchZak(authToken);
    //     }
    // }, [authToken]);


    // const fetchZak = async (authToken: string) => {
    //     const zakReq = await fetch(
    //         `https://api.zoom.us/v2/users/me/token?type=zak`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${authToken || "ixPfTrr5codJbC7pJkTQ8mf9-N7MIR9sQ"
    //                     }`,
    //             },
    //         }
    //     );
    //     const { token } = await zakReq.json();
    //     console.log("zak token : ", token);
    //     if (token) {
    //         settoken(token);
    //     }
    // };

    const joinMeeting = async () => {
        try {
            if (typeof document != undefined) {
                const rootElement = document.getElementById("zmmtg-root");
                if (rootElement) {
                    rootElement.style.display = "block";
                }
            }
            const signature = ZoomMtg.generateSDKSignature({ sdkKey: "0RG_LglYTBS2kvwVDiAYw", sdkSecret: "R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingNumber: meetingDetails.id.toString(), role: "0" })

            if (ZoomMtg.init) {
                ZoomMtg.init({
                    leaveUrl: process.env.NEXT_PUBLIC_URL || "",
                    isSupportAV: true,
                    success: (success: any) => {
                        console.log(success);

                        if (ZoomMtg.join) {
                            ZoomMtg.join({
                                passWord: meetingDetails.password,
                                sdkKey: "0RG_LglYTBS2kvwVDiAYw",
                                signature: signature,
                                meetingNumber: meetingDetails.id,
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
                        const signature = ZoomMtg.generateSDKSignature({ sdkKey: "0RG_LglYTBS2kvwVDiAYw", sdkSecret: "a1Gh3vHjChowcQBQo3uUwCigO2XZEsG4", meetingNumber: meetingDetails.id.toString(), role: "1" })
                        if (ZoomMtg.join) {
                            ZoomMtg.join({
                                passWord: meetingDetails.password,
                                sdkKey: "0RG_LglYTBS2kvwVDiAYw",
                                signature: signature,
                                meetingNumber: meetingDetails.id,
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

    const schedulemeeting = async () => {
        router.push(`https://zoom.us/oauth/authorize?response_type=code&client_id=0RG_LglYTBS2kvwVDiAYw&redirect_uri=${process.env.NEXT_PUBLIC_URL}`)
        const token = query.get("code");
        setauthToken(token || "")
        console.log("auth", authToken)
        console.log("access", accesstoken)
    }
    const accessToken = async () => {
        const at = await getaccessToken({ authToken: authToken })
        setaccesstoken(at)
    }

    return (
        <div className="h-screen z-[9999] w-screen flex items-center justify-center gap-10 p-10">
            <div className="flex fixed top-0 bg-orange-500 text-xl p-4 text-white gap-8">
                <button onClick={schedulemeeting}>scheduleMeeting</button>
                <button onClick={startMeeting}>Start Meeting</button>
                <button onClick={joinMeeting}>Join Meeting</button>
            </div>
            {showForm && <ScheduleMeetingForm setmeetinginfo={setmeetingDetails} accesstoken={accesstoken} />}
            {showForm && <div>
                <h1 className="text-xl">Meeting Details</h1>
                <p>meeting id : {meetingDetails.id}</p>
                <p>meeting password : {meetingDetails.password}</p>
            </div>}
        </div>
    );
};

export default ZoomMeeting;
