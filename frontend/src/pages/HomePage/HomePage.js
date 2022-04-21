import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import SuggestedVideos from '../SuggestedVideos/SuggestedVideos';
import useAuth from '../../hooks/useAuth';
import './Home.css';

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();

  return (
    <div className='container'>
      {/* <h1 style={{color:'white'}}>Home Page for {user.username}!</h1> */}
      <div className='app__page'>
        <Sidebar />
        <SuggestedVideos />
      </div>
    </div>
  );
};

export default HomePage;
