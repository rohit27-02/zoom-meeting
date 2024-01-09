'use client'
import { useRouter } from "next/navigation";

const ZoomMeeting = () => {
    const router = useRouter();
    return (
        <div className="h-screen  w-screen flex items-center justify-center gap-10 p-10">
            <div className="flex z-[9999] fixed top-0 bg-orange-500 text-xl p-4 text-white gap-8">
                <button onClick={()=> router.push(`https://zoom.us/oauth/authorize?response_type=code&client_id=0RG_LglYTBS2kvwVDiAYw&redirect_uri=${process.env.NEXT_PUBLIC_URL}/schedule`)}>scheduleMeeting</button>
            </div>
           
        </div>
    );
};

export default ZoomMeeting;
