'use client'
import { ZoomMtg } from "@zoomus/websdk";

interface MeetingDetails {
    id: number;
    zak:string;
}

const ZoomMeeting: React.FC<{ meetingDetails: MeetingDetails }> = ({
    meetingDetails,
}) => {
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
                    ZoomMtg.join({
                        sdkKey: process.env.ZOOM_CLIENT_ID,
                        signature: generateSignature(process.env.ZOOM_CLIENT_ID, process.env.ZOOM_CLIENT_SECRET, meetingDetails.id, 0),
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
            ZoomMtg.init({
                leaveUrl: "leaveUrl", // https://example.com/thanks-for-joining
                success: (success:any) => {
                    ZoomMtg.join({
                        sdkKey: process.env.ZOOM_CLIENT_ID,
                        signature: generateSignature(process.env.ZOOM_CLIENT_ID, process.env.ZOOM_CLIENT_SECRET, meetingDetails.id, 0),
                        meetingNumber: meetingDetails.id,
                        passWord: "",
                        userName: "rahul",
                        zak: meetingDetails.zak, // the host's ZAK token
                        success: (success:any) => {
                            console.log(success)
                        },
                        error: (error:any) => {
                            console.log(error)
                        }
                    })
                },
                error: (error:any) => {
                    console.log(error)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex gap-8">
            <button onClick={startMeeting}>Start Meeting</button>
            <button onClick={joinMeeting}>Join Meeting</button>
        </div>
    );
};

export default ZoomMeeting;
