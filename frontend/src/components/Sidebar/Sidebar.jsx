import React from 'react'
import SideBarRow from './SideBarRow'
import HomeIcon from '@material-ui/icons/Home'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';import ThumbUpAltOutLinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';import HistoryIcon from '@material-ui/icons/History';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

import './Sidebar.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <SideBarRow selected title="Home" Icon={HomeIcon}/>
      <SideBarRow title="Trending" Icon={WhatshotIcon}/>
      <SideBarRow title="Subscription" Icon={SubscriptionsIcon}/>
      <hr />
      <SideBarRow title="Library" Icon={VideoLibraryIcon}/>
      <SideBarRow title="History" Icon={HistoryIcon}/>
      <SideBarRow title="Your Videos" Icon={OndemandVideoIcon}/>
      <SideBarRow title="Watch Later" Icon={WatchLaterIcon}/>
      <SideBarRow title="Liked Videos" Icon={ThumbUpAltOutLinedIcon}/>
      <SideBarRow title="Show more" Icon={ExpandMoreIcon}/>
       <hr />

    </div>
  )
}

export default Sidebar