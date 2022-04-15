import React from 'react';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import './NavBar.css';

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='navBar'>
      <ul>
        <li className='brand'>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <MenuIcon />
          </Link>
          <img
            className='logo-img'
            src='https://upload.wikimedia.org/wikipedia/commons/a/af/Youtube.png'
            alt='youtube image'
          />
        </li>

        <li className="center-nav-cluster">
          <input type='text' className='search-field'/>
          <SearchIcon style = {{ color : "white"}} className='search-button'/>
        </li>

        <li></li>
        <li className='right-nav-cluster'>
          {user ? (
            <div>
              <VideoCallOutlinedIcon /> <AppsIcon /> <NotificationsIcon />{' '}
            </div>
          ) : (
            <div>
              {' '}
              <AppsIcon /> <MoreVertIcon />
            </div>
          )}

          {user ? (
            <Avatar onClick={logoutUser} />
          ) : (
            <button onClick={() => navigate('/login')}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
