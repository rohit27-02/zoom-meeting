'use server'
import { NextResponse } from 'next/server';
import Zoomus from 'zoomus';

const zoomClient = new Zoomus({
  clientId: process.env.ZOOM_CLIENT_ID,
  clientSecret: process.env.ZOOM_CLIENT_SECRET,
});

export async function POST(req, res) {
  console.log("Scheduling API");

  try {
    const { topic, start_time, duration, type } = req.body;
   console.log(topic, start_time, duration, type)
   
    // Check for missing details
    // if (!topic || !start_time || !duration || !type) {
    //   return NextResponse.json({ error: 'Missing details' }, { status: 400 });
    // }

    const durationInMinutes = parseInt(duration, 10);

    // Create Zoom meeting
    const meeting = await zoomClient.meeting.create({
      
      topic:"mum",
      type: "2",
      start_time:"2024-01-06T12:00:00",
      duration: "60",
    });

    console.log('Zoom API Response:', meeting);

    // Extract meeting ID and return it in the response
    const meetingId = meeting.id || ''; // Replace 'id' with the actual property in your meeting object
    return NextResponse.json({ status: 201, meetingId });
  } catch (error) {
    console.error('Error scheduling Zoom meeting:', error);

    // Return error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
