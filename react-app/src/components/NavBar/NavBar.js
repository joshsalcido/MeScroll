
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Modal from 'react-modal';
import PostForm from '../createPostForm/createPostForm';

Modal.setAppElement('body');


const NavBar = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  function openCreateForm(){
    setShowCreateForm(true)
  }
  function closeCreateForm(){
    setShowCreateForm(false)
  }


  return (
    <nav className='navvy'>
      <ul>
          <NavLink to='/' exact={true} activeClassName='active'>
            meScroll
          </NavLink>
          <button className='create-post-btn' onClick={openCreateForm}>+</button>
          <Modal isOpen={showCreateForm}>
            <button className='modal-x' onClick={closeCreateForm}>x</button>
            <PostForm closeCreateForm={closeCreateForm}/>
          </Modal>
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
