import axios from "axios";

export default async function POST(req: any, res: any) {
  const { access_token } = req.cookies;
  const idsOfSongs = req.body.idsOfSongs.map(
    (id: string) => `spotify:track:${id}`
  );
  console.log(idsOfSongs);

  try {
    const responseID = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userID = responseID.data.id;

    if (userID) {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          name: "Eurovision playlist",
          description:
            "Eurovision playlist from Eurovision Song Contest Generator",
          public: false,
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
          },
        }
      );

      const playlistID = response.data.id;

      if (playlistID) {
        try {
          const response = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            { uris: idsOfSongs, position: 0 },
            {
              headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("songs should have been saved");
          res.status(200).json({ response: response.data });
        } catch (error) {
          console.log("Error when trying to add songs to  a playlist: ", error)
          res.status(400).json({ error: error });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      response: "Something went wrong while creating a playlist",
      error: error,
    });
  }
}
