
import mongoose from "mongoose";
  // @ts-ignore
import EuropeanSongs from "../../../models/EuropeanSongs"

export default async function GET(req: any, res: any) {
    try {
        mongoose.connect(process.env.DB_URI!);
          // @ts-ignore
        const songs = await EuropeanSongs.find();
        return res.status(200).json({ songs: songs });
    } catch(err) {
        res.status(200).json({hello:err})
    }
}

