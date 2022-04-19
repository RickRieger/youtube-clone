import React, { useState,useEffect } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const Comment = (props) => {

    const auth = useAuth();
    const [user, token] = auth

    const[comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        getAllComments();
    }, []);

    async function getAllComments(){
        try{
            let response = await axios.get(`http://127.0.0.1:8000/api/comments/${props.videoId}`,{
                headers : {
                    Authorization: "Bearer " + token,
                }
            });
            setComments(response.data)
        }catch(e){
            console.log(e.message)
        }
 
    }

    async function postComment(){
        let body = {
            video: props.videoId,
            text : comment
        }
        try {
            let response = axios.post(`http://127.0.0.1:8000/api/comments/${props.videoId}`,body,{
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
            if(response.status == 201){
                await getAllComments()
        }}catch(e) {
            console.log(e.message)
            
        }
        
    }

    function handleSubmit(){
        postComment(comment);

    }


    return ( 
        <div>
            <input
            type='text'
            value={comment}
            className='search-field'
            placeholder='Comment...'
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
            }}
        /> 
        <div className="comments">
            <ul> 
                {comments.map((comment) => {
                    return(
                        <li> {comment} </li>
                    )
                })}
            </ul>
        </div>
        </div>
     );
}
 
export default Comment;