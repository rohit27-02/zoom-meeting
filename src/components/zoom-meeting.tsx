'use client'
import { generateSignature } from "@/utils/signature-generator";
import { ZoomMtg } from "@zoomus/websdk";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MeetingDetails {
    id: number;
}

const ZoomMeeting: React.FC<{ meetingDetails: MeetingDetails }> = ({
    meetingDetails,
}) => {
    const query = useSearchParams();
    const accessToken = query.get("code") || ""
    const [token, settoken] = useState("")
    useEffect(() => {
        console.log("access token : ",accessToken)
        fetchZak
    }, [accessToken])

    const fetchZak = async(accessToken:string)=>{
        const zakReq = await fetch(
            `https://api.zoom.us/v2/users/me/token?type=zak`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken || "SMhFJY8VcyMHBLEzipYTa-s4XeTkAD3yQ"}`,
                },
            }
        );
        const { token } = await zakReq.json();
        console.log("zak token : ",token)
        settoken(token)
    }

    const joinMeeting = async () => {
        try {
            ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareWebSDK();
            ZoomMtg.i18n.load('en-US')
            ZoomMtg.i18n.reload('en-US')
            ZoomMtg.init({
                leaveUrl: process.env.NEXT_PUBLIC_URL || "",
                isSupportAV: true,
                success: (success: any) => {
                    console.log("hi done here")
                    ZoomMtg.join({
                        sdkKey: "pOJF_dfeStiKIvxWYF36ig",
                        signature: generateSignature("pOJF_dfeStiKIvxWYF36ig", "R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingDetails.id, 0),
                        meetingNumber: meetingDetails.id,
                        userName: "rahul",
                        success: (success: any) => {
                            console.log(success)
                        },
                        error: (error: any) => {
                            console.log(error)
                        }
                    })
                }
            });
        } catch (error) {
            console.error("Error joining Zoom meeting:", error);
        }
    };
    const startMeeting = async () => {
        try {
            ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareWebSDK();
            ZoomMtg.i18n.load('en-US')
            ZoomMtg.i18n.reload('en-US')
            ZoomMtg.init({
                leaveUrl: process.env.NEXT_PUBLIC_URL || "", 
                success: (success: any) => {
                    console.log(success)
                    ZoomMtg.join({
                        passWord:"xJXrU0",
                        sdkKey: "pOJF_dfeStiKIvxWYF36ig",
                        signature: generateSignature("pOJF_dfeStiKIvxWYF36ig","R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingDetails.id, 1),
                        meetingNumber: meetingDetails.id,
                        userName: "rahul",
                        zak:token , // the host's ZAK token
                        success: (success: any) => {
                            console.log(success)
                        },
                        error: (error: any) => {
                            console.log(error)
                        }
                    })
                },
                error: (error: any) => {
                    console.log(error)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex z-[9999] fixed top-0 bg-orange-500 text-xl p-4 text-white gap-8">
            <a href={`https://zoom.us/oauth/authorize?response_type=code&client_id=pOJF_dfeStiKIvxWYF36ig&redirect_uri=${process.env.NEXT_PUBLIC_URL}`}>authorize</a>
            <button onClick={startMeeting}>Start Meeting</button>
            <button onClick={joinMeeting}>Join Meeting</button>
        </div>
    );
};

export default ZoomMeeting;
