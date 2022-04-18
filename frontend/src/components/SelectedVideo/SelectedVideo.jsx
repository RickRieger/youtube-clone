import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function SelectedVideo() {
    const params = useParams()
    const [videoInfo, setVideoInfo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState(null);
   
    useEffect(() => {
        getVideoInfoByID();
        getRelatedVideos();
        
    }, []);

    

    const getRelatedVideos = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${params.videoID}&type=video&key=AIzaSyBU3qFctfhcZe6sWIyxcxcdta9HUfwUyvc`
      );

      setRelatedVideos(result.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getVideoInfoByID = async () => {
    try {
      let result = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${params.videoID}&key=AIzaSyBQhKr8cZztWfy65bHIfq6m-rAINaBZ4yc`
      );
 
      setVideoInfo(result.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };


    
console.log(videoInfo)
console.log(relatedVideos)

  return (

    <div>
        {/* <iframe width="560" height="315" src= {`https://www.youtube.com/embed/${params.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
    </div>


  )
}

export default SelectedVideo