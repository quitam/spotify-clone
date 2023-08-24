import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import TopChartCard from "./TopChartCard";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetChartsQuery } from "../redux/services/shazamAPI";

import "swiper/css";
import "swiper/css/free-mode";

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetChartsQuery();
  const divRef = useRef(null);

  const topPlays = data?.tracks.slice(0, 5);

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      {/* Top Charts section */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer hover:text-gray-400">
              See more
            </p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays &&
            topPlays.map((song, i) => (
              <TopChartCard
                key={song.key}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePause={handlePause}
                handlePlay={() => handlePlay(song, i)}
              />
            ))}
        </div>
      </div>

      {/* Top Artist section */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Actists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer hover:text-gray-400">
              See more
            </p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays &&
            topPlays.map((song, i) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img
                    src={song?.images.background}
                    alt="name"
                    className="rounded-full w-full object-contain"
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
