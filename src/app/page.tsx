import React from 'react';
import dynamic from 'next/dynamic';
const DynamicZoomMeeting = dynamic(() => import('@/components/zoom-meeting'), {
  ssr: false, // Prevent server-side rendering
});
const Page = () => {
  return (
    <div>
          <DynamicZoomMeeting meetingDetails={{ id: 72187836905 }} />
    </div>
  );
};

export default Page;