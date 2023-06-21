import mongoose from "mongoose";
  // @ts-ignore
  import EuropeanSongs from "../../../models/EuropeanSongs";

export default async function DELETE(req: any, res: any) {
  
  mongoose.connect(process.env.DB_URI!);
  
  const blacklist = [
    "Beyoncé",
    "Kendrick Lamar",
    "Rema",
    "Selena Gomez",
    "Miley Cyrus",
    "Post Malone",
    "Ed Sheeran",
    "The Weeknd",
    "Taylor Swift",
    "Justin Bieber",
    "Ariana Grande",
    "David Guetta",
    "Drake",
    "Rihanna",
    "Coldplay",
    "Harry Styles",
    "Eminem",
    "Shakira",
    "Dua Lipa",
    "SZA",
    "Lady Gaga",
    "Elton John",
    "21 Savage",
    "Loreen",
    "FIFTY FIFTY",
  ];

  if (!Array.isArray(blacklist)) {
    return res
      .status(400)
      .send("Blacklist should be an array of artist names.");
  }

  const lowerCasedBlacklist = blacklist.map((artist) => artist.toLowerCase());

  try {
      // @ts-ignore
    const allSongs = await EuropeanSongs.find();
    let deletedCount = 0;

    for (let song of allSongs) {
      const originalLength = song.songsData.length;
        // @ts-ignore
      song.songsData = song.songsData.filter(songData => !lowerCasedBlacklist.includes(songData.artist.toLowerCase()));
      const newLength = song.songsData.length;
      deletedCount += originalLength - newLength;

      if (originalLength !== newLength) {
        // The song list changed, so update the database
        await song.save();
      }
    }

    res
      .status(200)
      .send(`Deleted ${deletedCount} songs from blacklisted artists.`);
  } catch (error) {
    res.status(500).send(error);
  }
}
