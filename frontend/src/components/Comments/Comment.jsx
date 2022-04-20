import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

function Comment(props) {
  useEffect(() => {
    getAllRelplies();
  }, []);
  const auth = useAuth();
  const [user, token] = auth;
  const { comment, commentId, userId, likes, dislikes } = props;
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
  console.log(replies);
  return (
    <div>
      <h3>{comment}</h3>
    </div>
  );
}

export default Comment;
