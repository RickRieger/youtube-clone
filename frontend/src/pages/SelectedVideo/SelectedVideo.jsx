import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectedVideo.css';
import Video from '../../components/Video/Video';
import Comments from '../../components/Comments/Comments';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';
import { containerClasses } from '@mui/material';
function SelectedVideo() {
  const params = useParams();
  const navigate = useNavigate();
  const [videoInfo, setVideoInfo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const auth = useAuth();
  const [user, token] = auth;

  useEffect(() => {
    getVideoInfoByID();
    getRelatedVideos();
    window.scrollTo(0, 0);
  }, [params.videoId]);

  const getRelatedVideos = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${params.videoId}&type=video&key=${process.env.REACT_APP_API_KEY}`
      );
      console.log(result);
      setRelatedVideos(result.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getVideoInfoByID = async () => {
    console.log(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${params.videoId}&key=${process.env.REACT_APP_API_KEY}`
    );
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${params.videoId}&key=${process.env.REACT_APP_API_KEY}`
      );

      setVideoInfo(result.data.items[0]);
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleOnClick = (videoId) => {
    navigate(`/selected-video/${videoId}`);
    console.log(videoId);
  };
  function abbreviateNumber(value) {
    let newValue = value;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixNum = 0;
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum++;
    }

    newValue = newValue.toPrecision(3);

    newValue += suffixes[suffixNum];
    return newValue;
  }
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
        {token ? (
          <div className='bottom-container'>
            <div className='comment-section'>
              <div className='comment-row-one'>
                <h2>{videoInfo.snippet.title}</h2>
              </div>
              <div className='comment-row-two'>
                {abbreviateNumber(videoInfo.statistics.viewCount)} views ·{' '}
                {moment(videoInfo.snippet.publishedAt).format('ll')}
              </div>
              <hr />
              <div className='description'>{videoInfo.snippet.description}</div>
              <hr />
              <Comments videoId={params.videoId} />
            </div>
            <div className='related-videos'>
              {relatedVideos
                .filter((video) => {
                  if ('snippet' in video) {
                    return true;
                  }
                })
                .map((video, index) => {
                  return (
                    <Video
                      key={index}
                      image={
                        video.snippet.thumbnails.high.url &&
                        video.snippet.thumbnails.high.url
                      }
                      title={video.snippet.title && video.snippet.title}
                      channel={
                        video.snippet.channelTitle && video.snippet.channelTitle
                      }
                      // views={video.snippet.viewCount ? video.snippet.viewCount : ''}
                      video_id={video.id.videoId && video.id.videoId}
                      uploadDate={
                        video.snippet.publishedAt && video.snippet.publishedAt
                      }
                      onClick={() => handleOnClick(video.id.videoId)}
                      suggest={false}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <div className='bottom-container'>
            <div className='message' style={{ marginTop: '100px' }}>
              {' '}
              <h1>COMMENT SECTION</h1>
              <p>Please register and/or log in to make and view comments</p>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SelectedVideo;
