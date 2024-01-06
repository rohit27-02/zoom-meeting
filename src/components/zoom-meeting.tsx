'use client'
import { ZoomMtg } from "@zoomus/websdk";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface MeetingDetails {
    id: number;
}

const ZoomMeeting: React.FC<{ meetingDetails: MeetingDetails }> = ({
    meetingDetails,
}) => {
    const query = useSearchParams();
    const zak = query.get("code") || ""
    useEffect(() => {
        console.log(zak)
    }, [zak])

    const joinMeeting = async () => {
        try {
            ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareWebSDK();
            ZoomMtg.i18n.load('en-US')
            ZoomMtg.i18n.reload('en-US')
            ZoomMtg.init({
                leaveUrl: "your-leave-url",
                isSupportAV: true,
                success: (success: any) => {
                    console.log("hi done here")
                    ZoomMtg.join({
                        sdkKey: "pOJF_dfeStiKIvxWYF36ig",
                        signature: generateSignature("pOJF_dfeStiKIvxWYF36ig", "R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingDetails.id, 0),
                        meetingNumber: meetingDetails.id,
                        passWord: "",
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
                leaveUrl: "leaveUrl", // https://example.com/thanks-for-joining
                success: (success: any) => {
                    console.log("hi done here")
                    ZoomMtg.join({
                        sdkKey: "pOJF_dfeStiKIvxWYF36ig",
                        signature: generateSignature("pOJF_dfeStiKIvxWYF36ig","R0aSVMGl5POSVCMM7L26TfiS2jMLc05Y", meetingDetails.id, 0),
                        meetingNumber: meetingDetails.id,
                        passWord: "",
                        userName: "rahul",
                        zak: zak, // the host's ZAK token
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
