import dynamic from 'next/dynamic';

const DynamicZoomMeeting = dynamic(() => import('@/components/zoom-meeting'), {
  ssr: false, // Prevent server-side rendering
});

export default function Home() {
  return (
    <DynamicZoomMeeting meetingDetails={{ id: 77861894050 }} />
  );
}
