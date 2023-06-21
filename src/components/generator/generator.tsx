import Player from "../player/player";
import React, { useEffect, useState } from "react";
import styles from "./generator.module.css";
import axios from "axios";
import Header from "../header/Header";

type CountrySongs = {
  songsData: Array<string | number>;
  country: string;
  isFavourite: boolean;
  whatSong: Array<string | number>;
  whatIndex: number;


};

type ProfileContextType = [
  { images: {url: string}[]; display_name: string; } | null,
  React.Dispatch<React.SetStateAction<{ images: {url: string}[]; display_name: string; } | null>>
];

export const ProfileContext = React.createContext<ProfileContextType>([null, () => {}]);


export default function Generator({ data }: any) {
  const [selectedSongs, setSelectedSongs] = useState<CountrySongs[]>(
    data.songs
  );
  const [favouritesExist, setFavouritesExist] = useState(false);
  const [profile, setProfile] = useState<{ images: {url: string}[]; display_name: string; } | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      setTimeout(() => setSaved(false), 3000);
    }
  }, [saved]);

  const generateSongs = () => {
    if (selectedSongs) {
      const newSelectedSongs: any = selectedSongs
        .map((CountrySongs) => {
          if (CountrySongs.isFavourite) {
            const favouriteSong =
              CountrySongs.songsData[CountrySongs.whatIndex];

            return {
              ...CountrySongs,
              whatSong: favouriteSong,
              isFavourite: true,
            };
          } else {
            const randomSongIndex = Math.floor(
              Math.random() * CountrySongs.songsData.length
            );
            const randomSong = CountrySongs.songsData[randomSongIndex];

            if (randomSong) {
              return {
                ...CountrySongs,
                whatSong: randomSong,
                whatIndex: randomSongIndex,
                isFavourite: false,
              };
            } else {
              return null;
            }
          }
        })
        .filter(Boolean);

      setSelectedSongs(newSelectedSongs);
    }
  };

  const toggleFavourite = (index: number) => {
    const updatedSongs = selectedSongs.map((country, i) =>
      i === index ? { ...country, isFavourite: !country.isFavourite } : country
    );

    setSelectedSongs(updatedSongs);

    const isAnyFavourite = updatedSongs.some((song) => song.isFavourite);

    setFavouritesExist(isAnyFavourite);
  };

  const createPlaylist = async () => {
    try {
      const idsOfSongs = selectedSongs.map((SongCountry) => {
        if (SongCountry.whatSong && SongCountry.isFavourite) {
          // @ts-ignore
          return SongCountry.whatSong.id;
        }
      });

      const filteredIdsOfSongs = idsOfSongs.filter(Boolean);

      await axios.post(
        "https://eurovisiongen.vercel.app/api/makePlaylist",
        {
          idsOfSongs: filteredIdsOfSongs,
        },
        { withCredentials: true }
      );

      setSaved(true);
    } catch (error) {
      console.error("An error occurred while saving a playlist:", error);
    }
  };

  return (
    <ProfileContext.Provider value={[profile, setProfile]}>
      <Header />
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <section className={styles.generateSection}>
            <div className={styles.generateButtonWrapper}>
              <button className={styles.generate} onClick={generateSongs}>
                Generate
              </button>
            </div>

            {favouritesExist && profile && (
              <div className={styles.createPlaylistButtonWrapper}>
                <button onClick={createPlaylist}>Create a Playlist</button>
                {saved && <span className={styles.saved}>Playlist Saved!</span>}
              </div>
            )}
          </section>

          <section className={styles.songSection}>
            {selectedSongs &&
            selectedSongs.some((CountrySongs) => CountrySongs.whatSong) ? (
              selectedSongs.map((CountrySongs, index) => {
                if (CountrySongs && CountrySongs.whatSong) {
                  return (
                    <Player
                      // @ts-ignore
                      key={CountrySongs.whatSong.id}
                      // @ts-ignore
                      id={CountrySongs.whatSong.id}
                      country={CountrySongs.country}
                      isFavourite={CountrySongs.isFavourite}
                      toggleFavourite={() => toggleFavourite(index)}
                    />
                  );
                }
              })
            ) : (
              <div className={styles.infoBox}>
                <h1>Welcome!</h1>
                <p className={styles.bangers}>
                  Explore trending bangerz from each Eurovision country.
                </p>
                <p>Save liked songs and create spotify playlists!</p>

                <p>Click on stars to add songs to a playlist or lock them.</p>
                <p>Have fun!</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </ProfileContext.Provider>
  );
}
