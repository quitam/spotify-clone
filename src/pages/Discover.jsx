import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useGetChartsQuery } from "../redux/services/shazamAPI";

const Discover = () => {
  const dispatch = useDispatch();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, error, isLoading } = useGetChartsQuery();

  if (isLoading) return <Loader title="Loading songs..." />;
  if (error) return <Error title="Oops... has an error. Please try again." />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover</h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-2 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data &&
          data.tracks
            // remove the song with title "Automotivo Bibi Fogosa" because image is depraved
            .filter((song) => song.title !== "Automotivo Bibi Fogosa")
            .map((song, i) => (
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={i}
              />
            ))}
      </div>
    </div>
  );
};

export default Discover;
