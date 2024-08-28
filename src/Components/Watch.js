import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../constant/Youtube";
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { GoDownload } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";

function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [desp, setDesp] = useState("");
  const [channelName, setChannelName] = useState("");
  const [icon, setIcon] = useState("");
  const [subscriberCount, setSubscriberCount] = useState("");
  const [color, setColor] = useState("black");
  const [userAction, setUserAction] = useState(null); // 'like' or 'dislike'

  const handleLike = () => {
    if (userAction === 'like') {
      setUserAction(null); // Undo like
    } else {
      setUserAction('like'); // Like the video
    }
  };

  const handleDislike = () => {
    if (userAction === 'dislike') {
      setUserAction(null); // Undo dislike
    } else {
      setUserAction('dislike'); // Dislike the video
    }
  };


  const formatSubscriberCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    } else {
      return count.toString();
    }
  };

  const fetchYoutubeVideo1 = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&regionCode=NP&key=${API_KEY}`
      );
      const videoData = res.data.items[0];
      const channelId = videoData.snippet.channelId;

      setDesp(videoData.snippet.title);
      setChannelName(videoData.snippet.channelTitle);
      setIcon(videoData.snippet.thumbnails.high.url);

      // Fetch channel details, including subscriber count
      const channelRes = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`
      );
      const channelData = channelRes.data.items[0];
      const formattedSubscriberCount = formatSubscriberCount(
        channelData.statistics.subscriberCount
      );
      setSubscriberCount(formattedSubscriberCount);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    }
  };

  useEffect(() => {
    fetchYoutubeVideo1();
  }, []);

  return (
    <div className="mt-4">
      <div>
        <iframe
          width="1000"
          height="600"
          src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="border rounded-lg"
        ></iframe>
      </div>
      <div>
        <p className="font-bold mt-2 text-2xl w-[1000px]">{desp}</p>
      </div>
      <div className="mt-4 flex w-[1000px]">
        <div className="flex space-x-4">
          <div>
            <Avatar size={50} round={true} src={icon} />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xl">{channelName}</span>
            <span className="text-gray-500">{subscriberCount}subscribers</span>
          </div>
        </div>
        <div className="ml-8">
          <button className="bg-black px-4 py-2 rounded-full text-white font-medium text-lg">
            Subscribe
          </button>
        </div>
        <div className="flex space-x-6 ml-auto">
          <div className="flex space-x-6 bg-slate-100 cursor-pointer rounded-full py-2 px-4">
            <AiOutlineLike
              size={30}
              style={{
                color: userAction === "like" ? "blue" : "black",
                cursor: "pointer",
              }}
              onClick={handleLike}
            />
            <AiOutlineDislike
              size={30}
              style={{
                color: userAction === "dislike" ? "blue" : "black",
                cursor: "pointer",
              }}
              onClick={handleDislike}
            />
          </div>
          <div className="flex space-x-2 bg-slate-100 cursor-pointer rounded-full py-3 px-4">
            <PiShareFat size={25} />
            <span className="font-medium text-lg">Share</span>
          </div>
          <div className="flex space-x-2 bg-slate-100 cursor-pointer rounded-full py-3 px-4">
            <GoDownload size={25} />
            <span className="font-medium text-lg">Download</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
