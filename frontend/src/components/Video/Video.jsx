import React from 'react';
import moment from 'moment';
import './Video.css';
import { useNavigate } from 'react-router-dom';

const Video = (props) => {
  const navigate = useNavigate();
  const handleOnClick = (videoId) => {
    navigate(`/selected-video/${videoId}`);
  };

  return (
    <div
      className='videoContainer'
      onClick={() => handleOnClick(props.video_id)}
    >
      <img className='videoThumbnail' src={props.image}></img>
      <div className='videoContainerInfo'>
        <div className='videoContainerText'>
          <p className='videoTitleText'>{props.title}</p>
          <p className='videoViewsText'>
            {' '}
            {props.channel}
            <br></br> views: {props.views} ·{' '}
            {moment(props.uploadDate).startOf('day').fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
