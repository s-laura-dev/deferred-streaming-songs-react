import Image from "next/image";
import { Song } from "../types/Song";
import { PlayButton } from "./PlayButton";

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="flex flex-row items-center w-full bg-[#f5f2f8] gap-3.5 rounded-sm shadow-md overflow-hidden">
      <div className="relative w-[50px] h-[50px] flex-shrink-0">
        <Image
          className="absolute top-0 left-0 "
          src={song.album.cover}
          alt={song.album.title}
          width={50}
          height={50}
        />
        <PlayButton url={song.preview} />
      </div>
      <div className="flex flex-col justify-center p-2">
        <h3 className="text-xs line-clamp-1">{song.title_short}</h3>
        <h4 className="text-xs text-gray-500">{song.artist.name}</h4>
      </div>
    </div>
  );
}
