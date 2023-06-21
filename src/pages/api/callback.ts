import { URLSearchParams } from 'url';

export default async function callback(req :any , res :any) {
  const { code, state } = req.query;
  console.log("code", code)
  console.log("state", state)

  if (state === null) {
    res.status(200).json({ data: "State is not identified" });
    return;
  } else {
    const authOptions = {
      method: 'POST',
      body: new URLSearchParams({
        code: code,
        redirect_uri: "https://eurovisiongen.vercel.app/api/callback",
        grant_type: 'authorization_code'
      }),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const { access_token, refresh_token } = data;

      res.setHeader('Set-Cookie', [
        `access_token=${access_token}; Path=/; HttpOnly; SameSite=Lax`,
        `refresh_token=${refresh_token}; Path=/; HttpOnly; SameSite=Lax`
      ]);
      
      // Redirect the user back to your main page
      res.redirect('/');

      
    console.log("Cookies are set.")
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
