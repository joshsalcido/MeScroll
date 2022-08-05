
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Modal from 'react-modal';
import PostForm from '../createPostForm/createPostForm';



const NavBar = () => {
  const sessionUser = useSelector(state => state.session?.user)

  // console.log(sessionUser, "NAVBAR SESION USER")

  const [showCreateForm, setShowCreateForm] = useState(false);


  Modal.setAppElement('body');

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
          <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
            <button className='my-profile-btn'>My Profile</button>
          </NavLink>
          <LogoutButton />
      </ul>
    </nav>
  );
}

export default NavBar;
