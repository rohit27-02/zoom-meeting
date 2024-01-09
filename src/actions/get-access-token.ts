"use server"
export const getaccessToken = async ({authToken}:{authToken:string}) => {
    const data = new URLSearchParams();
    data.append("code", authToken);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", `${process.env.NEXT_PUBLIC_URL}/schedule` || "");
    data.append("client_id", "0RG_LglYTBS2kvwVDiAYw");
    data.append("client_secret",'a1Gh3vHjChowcQBQo3uUwCigO2XZEsG4');
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