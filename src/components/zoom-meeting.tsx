'use client'
import { ZoomMtg } from "@zoomus/websdk";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MeetingDetails {
    id: number;
}
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const ZoomMeeting: React.FC<{ meetingDetails: MeetingDetails }> = ({
    meetingDetails,
}) => {
    const query = useSearchParams();
    const accessToken = query.get("code") || "ixPfTrr5codJbC7pJkTQ8mf9-N7MIR9sQ";
    const [token, settoken] = useState("ixPfTrr5codJbC7pJkTQ8mf9-N7MIR9sQ");

      useEffect(() => {
        console.log("access token : ", accessToken);
        if (fetchZak) {
          fetchZak(accessToken);
        }
      }, [accessToken]);


    const fetchZak = async (accessToken: string) => {
        const zakReq = await fetch(
            `https://api.zoom.us/v2/users/me/token?type=zak`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken || "ixPfTrr5codJbC7pJkTQ8mf9-N7MIR9sQ"
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

    return (
        <div className="flex z-[9999] fixed top-0 bg-orange-500 text-xl p-4 text-white gap-8">
            <button onClick={startMeeting}>Start Meeting</button>
            <button onClick={joinMeeting}>Join Meeting</button>
        </div>
    );
};

export default ZoomMeeting;
