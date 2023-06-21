export default async function getProfile(req :any, res :any) {
    const { access_token } = req.cookies;
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + access_token,
        },
      });
  
      if (!response.ok) {
        console.log("Response from getting a profile was not ok")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
  
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  