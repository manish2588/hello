import React, { useEffect, useState } from "react";
import axios from "axios";
import { YOUTUBE_VIDEO_API ,API_KEY} from "../constant/Youtube";
import VideoCart from "./VideoCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../utils/appSlice";
function VideoContainer() {
  const { video, category } = useSelector((store) => store.app);
  console.log(category);
  const dispatch = useDispatch();
  const fetchYoutubeVideo = async () => {
    try {
      console.log("Request URL:", YOUTUBE_VIDEO_API);
      const res = await axios.get(`${YOUTUBE_VIDEO_API}`);
      console.log("Response from YouTube API:", res);
      dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
      console.error("Error fetching YouTube:", error);
      console.error("Error details:", error.response); // Logs detailed error response
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
      className={`grid gap-3 ${
        open ? "grid-cols-3" : "grid-cols-4"
      } transition-all duration-300`}
    >
      {video.map((video) => (
        <Link
          to={`/watch?v=${
            typeof video.id === "object" ? video.id.videoId : video.id
          }`}
          key={typeof video.id === "object" ? video.id.videoId : video.id}
        >
          <VideoCart video={video} />
        </Link>
      ))}
    </div>
  );
}

export default VideoContainer;
