import React from 'react';
import './SideBarRow.css'
function SideBarRow({ selected, title, Icon }) {
  return (
    <div className={`sidebar__row ${selected && 'selected'}`}>
      <Icon className="sidebar__row__icon"/>
      <h2  className="sidebar__row__title">{title}</h2>
    </div>
  );
}

export default SideBarRow;
