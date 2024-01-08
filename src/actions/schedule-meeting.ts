"use server"
export const scheduleMeeting = async({accesstoken}:{accesstoken:string})=>{
    const meetingData = {
        topic: 'Sample Meeting',
        type: 2,
        start_time: Date.now() + 2,
        duration: 60,
        timezone: 'America/New_York',
        agenda: 'Discuss important matters',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: false,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          registration_type: 1,
          audio: 'both',
          auto_recording: 'none',
        },
      };
      const res = await fetch("https://api.zoom.us/v2/users/me/meetings",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(meetingData),
      })
      const json = await res.json();
      console.log(json)
      return {json:{id:json.id,password:json.password}}
}