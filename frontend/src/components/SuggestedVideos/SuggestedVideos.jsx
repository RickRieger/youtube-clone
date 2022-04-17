import React from 'react'
import './SuggestedVideos.css'
import Video from '../Video/Video'
function SuggestedVideos() {
  return (
    <div className="suggested__videos">
      <h2> Suggested Videos</h2>
      <div className='suggestedVideos_videos'>
        <Video/>
        <Video/>
        <Video/>
        <Video/>
        <Video/>
        <Video/>

      </div>
    </div>
  )
}

export default SuggestedVideos