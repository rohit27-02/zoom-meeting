"use server"
export const getaccessToken = async ({authToken}:{authToken:string}) => {
    const data = new URLSearchParams();
    data.append("code", authToken);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", `https://zoom-meeting-ten.vercel.app/schedule`);
    data.append("client_id", `${process.env.ZOOM_CLIENT_ID}`);
    data.append("client_secret",`${process.env.ZOOM_CLIENT_SECRET}`);
    const res = await fetch("https://zoom.us/oauth/token", {
        method: "POST",
        body: data,
    });
    const json = await res.json();
    console.log(json)
    if (json.access_token) {
       return json.access_token;
    }
};