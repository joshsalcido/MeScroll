
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
          <NavLink to='/' exact={true} activeClassName='active'>
            meScroll
          </NavLink>
        <button className='create-post-btn'>Create Post</button>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
          <LogoutButton />
      </ul>
    </nav>
  );
}

export default NavBar;
