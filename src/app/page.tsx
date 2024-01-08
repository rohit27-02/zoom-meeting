import React from 'react';
import dynamic from 'next/dynamic';
import ScheduleMeetingForm from '@/components/schedule-meeting-form';
const DynamicZoomMeeting = dynamic(() => import('@/components/zoom-meeting'), {
  ssr: false, // Prevent server-side rendering
});
const Page = () => {
  return (
    <div>
          <DynamicZoomMeeting />
    </div>
  );
};

export default Page;