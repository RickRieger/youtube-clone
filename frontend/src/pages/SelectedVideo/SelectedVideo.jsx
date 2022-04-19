import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SelectedVideo.css';
import Video from '../../components/Video/Video';


function SelectedVideo() {
  const params = useParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);

  useEffect(() => {
    getVideoInfoByID();
    getRelatedVideos();
  }, []);

  const getRelatedVideos = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${params.videoId}&type=video&key=${process.env.REACT_APP_API_KEY}`
      );
      console.log(result)
      setRelatedVideos(result.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getVideoInfoByID = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${params.videoId}&key=${process.env.REACT_APP_API_KEY}`
      );

      setVideoInfo(result.data.items[0]);
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(videoInfo);
  console.log(relatedVideos);
  if (!relatedVideos) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className='video-responsive'>
          <iframe
            src={`https://www.youtube.com/embed/${params.videoId}`}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title='Embedded youtube'
          />
        </div>
        <div className='bottom-container'>
          <div className='comment-section'>
            <div className='comment-row-one'>{videoInfo.snippet.title}</div>
            <div className='comment-row-two'>
              {videoInfo.statistics.viewCount} views .{' '}
              {videoInfo.snippet.publishedAt}
              {videoInfo.snippet.description}
            </div>
          </div>
          <div className='related-videos'>
            {relatedVideos.map((video, index) => {
              console.log(video)
              return (
                <Video
                  key={index}
                  // image={video.snippet.thumbnails.high.url}
                  // title={video.snippet.title}
                  channel={video.snippet.channelTitle}
                  // views={viewCount ? viewCount : ''}
                  video_id={video.id}
                  uploadDate={video.snippet.publishedAt}
                />
              );
            })}
          </div>

        </div>
      </>
    );
  }
}

export default SelectedVideo;
