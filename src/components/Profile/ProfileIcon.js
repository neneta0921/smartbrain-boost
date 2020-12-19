import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


const ProfileIcon = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div className='pa4 tc'>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag='span' data-toggle='dropdown' aria-expanded={dropdownOpen}>
          <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 h3 w3 dib" alt="avatar"
              style={{marginBottom: '0'}} />
        </DropdownToggle>
        <DropdownMenu
          className='b--transparent shadow-5'
          style={{marginTop: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
          <DropdownItem>View Profile</DropdownItem>
          <DropdownItem>Singout</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
}

export default ProfileIcon