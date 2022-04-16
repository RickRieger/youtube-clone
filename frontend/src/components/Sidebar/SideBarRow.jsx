import React from 'react';
import './SideBarRow.css'
function SideBarRow({ title, Icon }) {
  return (
    <div className='sidebar__row'>
      <Icon className="sidebar__row__icon"/>
      <h2  className="sidebar__row__title">{title}</h2>
    </div>
  );
}

export default SideBarRow;
