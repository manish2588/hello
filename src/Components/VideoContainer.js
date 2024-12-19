import React, { useEffect } from "react";
import axios from "axios";
import { YOUTUBE_VIDEO_API, API_KEY } from "../constant/Youtube";
import VideoCart from "./VideoCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../utils/appSlice";

function VideoContainer() {
  const { video, category } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const fetchYoutubeVideo = async () => {
    try {
      const res = await axios.get(`${YOUTUBE_VIDEO_API}`);
      dispatch(setHomeVideo(res?.data?.items));
    } catch (error) {
      console.error("Error fetching YouTube:", error);
    }
  };

  const fetchVideoByCategory = async (category) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${API_KEY}`
      );
      dispatch(setHomeVideo(res?.data?.items));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (category === "All") {
      fetchYoutubeVideo();
    } else {
      fetchVideoByCategory(category);
    }
  }, [category]);

  const open = useSelector((store) => store.app.open);

  return (
    <div
      className={`w-full grid  ${
        open
          ? "lg:grid-cols-3 gap-4 sm:grid-cols-1"
          : "lg:grid-cols-4 gap-4 sm:grid-cols-1"
      } transition-all duration-300`}
      style={{ padding: "0", margin: "0" }}
    >
      {video.map((video) => (
        <Link
          to={`/watch?v=${
            typeof video.id === "object" ? video.id.videoId : video.id
          }`}
          key={typeof video.id === "object" ? video.id.videoId : video.id}
        >
          <div className="w-full">
            <VideoCart video={video} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoContainer;
