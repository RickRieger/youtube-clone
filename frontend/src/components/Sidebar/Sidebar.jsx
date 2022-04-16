import React from 'react'
import SideBarRow from './SideBarRow'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import HomeIcon from '@material-ui/icons/Home';

import './Sidebar.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <SideBarRow title="Home" Icon={HomeIcon}/>
      <SideBarRow title="Trending" Icon={WhatshotIcon}/>
      <SideBarRow title="Subscription" Icon={SubscriptionsIcon}/>
    </div>
  )
}

export default Sidebar