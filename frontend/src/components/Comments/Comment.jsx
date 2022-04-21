import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import "./Comments.css"
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

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
      reply : reply,
    };
    try {
      let response = axios.post(`http://127.0.0.1:8000/api/replies/${commentId}/`, body, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }



  console.log(replies);

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

  return (
    <div>
        <div className="comment-header-container"> 
          <div className="username-text">
            {username} 
          </div>
          <div className="date-text">
            {moment(created).startOf('hour').fromNow()}
          </div>
        </div>
      <h3> {comment} </h3>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
          marginTop: '40px',
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
            width: '80%',
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
        <Button variant='text'>CANCEL</Button>
        <Button
          variant='outlined'
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          REPLY
        </Button>
        {/*<Comment videoId={params.videoId} /> */}
      </Box>
    <div className='replies'>
      {replies.reverse().map((reply) => {
        return (
          reply.text
        );
      })}
    </div>
      
    </div>
  );
}

export default Comment;
