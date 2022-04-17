import react from "react";
import './Video.css'
import Avatar from '@material-ui/core/Avatar';
// TODO: setup up props to get thumbnail, title, channel, views and timestamp

const Video = (props) => {
    return (
        <div className="videoContainer">
            <img className = "videoThumbnail" src = "https://upload.wikimedia.org/wikipedia/commons/4/44/0000203ac_hippodroom_theater-circus.jpg"></img>
            <div className="videoContainerInfo"> 
                <Avatar/>
                <div className="videoContainerText">
                    <p className="videoTitleText"> title </p>
                    <p className="videoViewsText"> channel <br></br> views · timestamp </p>
                </div>
            </div> 
        </div>
      );
}
 
export default Video;