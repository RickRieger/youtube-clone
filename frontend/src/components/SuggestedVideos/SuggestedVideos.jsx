import React, { useEffect, useState } from 'react';
import './SuggestedVideos.css';
import Video from '../Video/Video';
import axios from 'axios';
function SuggestedVideos() {
  useEffect(() => {
    getAllPopularVideos();
  }, []);

  const [popularVideos, setPopularVideos] = useState([]);

  console.log(process.env.REACT_APP_API_KEY);

  const getAllPopularVideos = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=AIzaSyBQhKr8cZztWfy65bHIfq6m-rAINaBZ4yc`
      );

      setPopularVideos(result.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(popularVideos);

  if (!popularVideos) {
    console.log(popularVideos);
    return <div>'loading...'</div>;
  } else {
    return (
      <div className='suggested__videos'>
        <div className='suggestedVideos_videos'>
          {popularVideos.map((video) => {
            return (
              <Video
                key={video.id}
                image={video.snippet.thumbnails.high.url}
                title={video.snippet.title}
                channel={video.snippet.channelTitle}
                views={video.statistics.viewCount}
                uploadDate={video.snippet.publishedAt}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SuggestedVideos;
// video.snippet.thumbnails.high
