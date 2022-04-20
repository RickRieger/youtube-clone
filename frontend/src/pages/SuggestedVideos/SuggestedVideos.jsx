import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SuggestedVideos.css';
import Video from '../../components/Video/Video';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SuggestedVideos() {
  const navigate = useNavigate();
  const params = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (params.query) {
      handleSearch();
    } else {
      getAllPopularVideos();
    }
  }, [params.query]);

  console.log(process.env.REACT_APP_API_KEY);

  const getAllPopularVideos = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`
      );

      setVideos(result.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSearch = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${params.query}&key=${process.env.REACT_APP_API_KEY}`
      );

      setVideos(result.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(videos);
  // const viewCount = videos.statistics.viewCount;
  if (!videos) {
    return <div>'loading...'</div>;
  } else {
    return (
      <div className='suggested__videos'>
        <div className='suggestedVideos_videos'>
          {videos.map((video, index) => {
            return (
              <Video
                key={index}
                image={video.snippet.thumbnails.high.url}
                title={video.snippet.title}
                channel={video.snippet.channelTitle}
                // views={viewCount ? viewCount : ''}
                video_id={video.id}
                uploadDate={video.snippet.publishedAt}
                suggest={true}
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
