import qs from 'querystring';
  // @ts-ignore
import randomString from 'randomstring'

let redirect_uri = 'https://eurovisiongen.vercel.app/api/callback';

export default async function GET(req: any, res: any) {
  let state = randomString.generate(12);
  let scope = ' playlist-modify-private user-read-private user-read-email';

  let queryParams = qs.stringify({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });


  res.redirect('https://accounts.spotify.com/authorize?' + queryParams);
}
