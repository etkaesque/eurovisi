import mongoose from 'mongoose';

const countrySongSchema = new mongoose.Schema({
  country: String,
  code: String,
  playlist: String,
  songsData: [
    {
      id: String,
      artist: String,
      song: String,
      country: String,
      release_date: String,
      image: String,
      date_added: Date,
    },
  ],
});

let EuropeanSongs;

if (mongoose.models.EuropeanSongs) {
    EuropeanSongs = mongoose.model('EuropeanSongs');
} else {
    EuropeanSongs = mongoose.model('EuropeanSongs', countrySongSchema);
}

export default EuropeanSongs;
