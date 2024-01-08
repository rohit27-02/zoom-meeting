'use client'
import { ZoomMtg } from "@zoomus/websdk";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const ZoomMeeting = () => {
    const query = useSearchParams();
    const authToken = query.get("code") || "";
    const [token, settoken] = useState("");
    const [accesstoken, setaccesstoken] = useState("");
    const [meetingDetails, setmeetingDetails] = useState({id:"",password:""})

    useEffect(() => {
        console.log("access token : ", authToken);
        if (fetchZak) {
            fetchZak(authToken);
        }
    }, [authToken]);


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
            const signature = ZoomMtg.generateSDKSignature({ sdkKey: "pOJF_dfeStiKIvxWYF36ig", sdkSecret: "R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingNumber: meetingDetails.id.toString(), role: "0" })

            if (ZoomMtg.init) {
                ZoomMtg.init({
                    leaveUrl: process.env.NEXT_PUBLIC_URL || "",
                    isSupportAV: true,
                    success: (success: any) => {
                        console.log(success);

                        if (ZoomMtg.join) {
                            ZoomMtg.join({
                                passWord: "9kBuMe",
                                sdkKey: "pOJF_dfeStiKIvxWYF36ig",
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
                        const signature = ZoomMtg.generateSDKSignature({ sdkKey: "pOJF_dfeStiKIvxWYF36ig", sdkSecret: "R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingNumber: meetingDetails.id.toString(), role: "1" })
                        if (ZoomMtg.join) {
                            ZoomMtg.join({
                                passWord: "9kBuMe",
                                sdkKey: "pOJF_dfeStiKIvxWYF36ig",
                                signature: signature,
                                userEmail: "khandelwalrahul743@gmail.com",
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

    const getaccessToken = async () => {
        const data = new URLSearchParams();
        data.append("code", authToken);
        data.append("grant_type", "authorization_code");
        data.append("redirect_uri", process.env.NEXT_PUBLIC_URL || "");
        data.append("client_id", "0RG_LglYTBS2kvwVDiAYw");
        data.append("client_secret",'a1Gh3vHjChowcQBQo3uUwCigO2XZEsG4');
        const res = await fetch("https://zoom.us/oauth/token", {
            method: "POST",
            body: data,
        });
        const json = await res.json();
        console.log(json)
        if (json.access_token) {
            setaccesstoken(json.access_token);
        }
    };

    const scheduleMeeting = async()=>{
        const meetingData = {
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
          };
          const res = await fetch("https://api.zoom.us/v2/users/me/meetings",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accesstoken}`,
            },
            body: JSON.stringify(meetingData),
          })
          const json = await res.json();
          console.log(json)
          setmeetingDetails({id:json.id,password:json.password})
    }

    return (
        <div className="flex z-[9999] fixed top-0 bg-orange-500 text-xl p-4 text-white gap-8">
            <Link

                href={`https://zoom.us/oauth/authorize?response_type=code&client_id=0RG_LglYTBS2kvwVDiAYw&redirect_uri=${process.env.NEXT_PUBLIC_URL}`}
            >
                authorize
            </Link>
            <button onClick={getaccessToken}>get access token</button>
            <button onClick={scheduleMeeting}>scheduleMeeting</button>
            <button onClick={startMeeting}>Start Meeting</button>
            <button onClick={joinMeeting}>Join Meeting</button>
        </div>
    );
};

export default ZoomMeeting;
