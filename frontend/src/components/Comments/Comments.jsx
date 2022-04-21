import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Comments.css';
import Comment from './Comment';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
const ariaLabel = { 'aria-label': 'description' };
const Comments = (props) => {
  const params = useParams();

  const auth = useAuth();
  const [user, token] = auth;

  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState([]);

  useEffect(() => {
    getAllComments();
  }, [props.videoId]);

  async function getAllComments() {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/comments/${props.videoId}/`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setComments(response.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  const postComment = async (callBack) => {
    let body = {
      video: props.videoId,
      text: userComment,
    };
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/comments/`,
        body,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      callBack();
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSuccess = () => {
    setUserComment('');
    getAllComments();
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (userComment.length === 0) {
      alert('cant be empty');
      return;
    }
    postComment(onSuccess);
  }

  return (
    <div className='container-comments'>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
          marginTop: '40px',
          marginBottom: '40px',
        }}
        noValidate
        autoComplete='off'
      >
        <Input
          placeholder='Add a comment...'
          inputProps={ariaLabel}
          sx={{
            color: 'white',
            border: 'white',
            width: '80%',
          }}
          type='text'
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
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
          COMMENT
        </Button>
      </Box>
      <div className='comments'>
        {comments
          .slice(0)
          .reverse()
          .map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment.text}
                commentId={comment.id}
                userId={comment.user_id}
                username={comment.username}
                likes={comment.likes}
                dislikes={comment.dislikes}
                created={comment.created}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
