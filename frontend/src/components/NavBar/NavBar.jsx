import React from 'react';
import { useContext, useState } from 'react';
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
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (query.length === 0) {
      alert('please enter a proper search query!');
      return;
    }
    navigate(`/${query}`);
    setQuery('');
  };

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

        <li className='center-nav-cluster'>
          <input
            type='text'
            value={query}
            className='search-field'
            placeholder='Search'
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchQuery();
              }
            }}
          />
          <SearchIcon className='search-button' onClick={handleSearchQuery} />
        </li>
        <li className='right-nav-cluster'>
          {user ? (
            <div>
              <VideoCallOutlinedIcon className='header_icons' />{' '}
              <AppsIcon className='header_icons' />{' '}
              <NotificationsIcon className='header_icons' />{' '}
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
