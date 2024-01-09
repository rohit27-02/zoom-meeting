'use client'
import { getaccessToken } from "@/actions/get-access-token";
import { scheduleMeeting } from "@/actions/schedule-meeting";
import { ZoomMtg } from "@zoomus/websdk";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const ZoomMeeting = () => {
    const router = useRouter();
   


    // useEffect(() => {
    //     console.log("access token : ", authToken);
    //     if (fetchZak) {
    //         fetchZak(authToken);
    //     }
    // }, [authToken]);


    return (
        <div className="h-screen  w-screen flex items-center justify-center gap-10 p-10">
            <div className="flex z-[9999] fixed top-0 bg-orange-500 text-xl p-4 text-white gap-8">
                <button onClick={()=> router.push(`https://zoom.us/oauth/authorize?response_type=code&client_id=0RG_LglYTBS2kvwVDiAYw&redirect_uri=${process.env.NEXT_PUBLIC_URL}/schedule`)}>scheduleMeeting</button>
            </div>
           
        </div>
    );
};

export default ZoomMeeting;
