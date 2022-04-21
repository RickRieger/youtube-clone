import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import './Comments.css';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//NOTES: Attempted to use the axios requests to get the replies and map them inside this component. I was
//getting some errors with the axios.post call but the axios.get seems to working fine.

function Comment(props) {
  useEffect(() => {
    getAllRelplies();
  }, []);
  const auth = useAuth();
  const [user, token] = auth;
  const { comment, commentId, userId, likes, dislikes, username, created } =
    props;
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState('');
  const [replyBool, setReplyBool] = useState(false);
  const [showReplyBool, setShowReplyBool] = useState(false);

  const getAllRelplies = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/replies/${commentId}/`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setReplies(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  async function postReply() {
    let body = {
      text: reply,
    };
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/replies/${commentId}/`,
        body,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      getAllRelplies();
      setReply('');
    } catch (e) {
      console.log(e.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (reply.length === 0) {
      e.preventDefault();
      alert('cant be empty');
      return;
    }

    postReply(reply);
    setReply('');
  }
  console.log(replies);
  return (
    <div>
      <div className='comment-header-container'>
        <div className='username-text'>{username}</div>
        <div className='date-text'>
          {moment(created).startOf('hour').fromNow()}
        </div>
      </div>
      <h3 style={{ marginBottom: '20px' }}> {comment} </h3>
      <ThumbUpOutlinedIcon />
      <span style={{ marginLeft: '10px', verticalAlign: 'super' }}>
        {likes}
      </span>
      <ThumbDownAltOutlinedIcon style={{ marginLeft: '20px' }} />
      <span
        style={{
          marginLeft: '10px',
          verticalAlign: 'super',
          marginRight: '20px',
        }}
      >
        {dislikes}
      </span>
      <Button variant='text' onClick={() => setReplyBool(true)}>
        Reply
      </Button>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
          marginTop: '40px',
          display: replyBool ? 'block' : 'none',
          right: '0px',
        }}
        noValidate
        autoComplete='off'
      >
        <Input
          placeholder='Add a reply...'
          // inputProps={ariaLabel}
          sx={{
            color: 'white',
            border: 'white',
            width: '60%',
          }}
          type='text'
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        <Button variant='text' onClick={() => setReplyBool(false)}>
          CANCEL
        </Button>
        <Button
          variant='outlined'
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          REPLY
        </Button>
      </Box>
      <div className='reply-container'>
        <div onClick={() => setShowReplyBool(!showReplyBool)}>
          {showReplyBool ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {showReplyBool ? (
            <span>Hide 6 replies</span>
          ) : (
            <span>Show 6 replies</span>
          )}
        </div>

        {showReplyBool ? (
          <div className='replies'>
            {replies.reverse().map((reply, index) => {
              return <div key={index}>{reply.text}</div>;
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Comment;
