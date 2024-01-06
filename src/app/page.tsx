'use client'
import ZoomMeeting from "@/components/zoom-meeting";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const query = useSearchParams();
  const zak = query.get("code") || ""
  return (
    <main>
      <ZoomMeeting meetingDetails={{id:78882606250,zak:zak}}/>
      <a href={`https://zoom.us/oauth/authorize?response_type=code&client_id=pOJF_dfeStiKIvxWYF36ig&redirect_uri=${process.env.NEXT_PUBLIC_URL}`}>authorize</a>
    </main>
  )
}
