"use server";
export const scheduleMeeting = async ({
  accesstoken,
  meetingData,
}: {
  accesstoken: string;
  meetingData: any;
}) => {
  console.log(meetingData);
  const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accesstoken}`,
    },
    body: JSON.stringify(meetingData),
  });
  const json = await res.json();
  console.log(json);
  return { json: { id: json.id, password: json.password } };
};
