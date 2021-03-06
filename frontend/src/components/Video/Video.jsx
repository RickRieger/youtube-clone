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
      className={props.suggest ? 'videoContainer' : 'videoContainer-suggested'}
      onClick={() => handleOnClick(props.video_id)}
    >
      <img
        className='videoThumbnail'
        src={props.image}
        alt='No image available'
      ></img>
      <div className='videoContainerInfo'>
        <div className='videoContainerText'>
          <p className='videoTitleText'>{props.title}</p>
          <p className='videoViewsText'>
            {' '}
            {props.channel}
            <br></br> {props.views ? 'views:' : ''} {props.views}{' '}
            {props.views ? '·' : 'Uploaded'}{' '}
            {moment(props.uploadDate).startOf('day').fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
