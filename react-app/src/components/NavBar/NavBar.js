
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Modal from 'react-modal';
import PostForm from '../createPostForm/createPostForm';

import createPostbtn from './plus-icon.png'
import profileIcon from './profile-user.png'
import homebutton from './home-button.png'
import githubLogo from './github.png'
import linkedInLogo from './linkedin.png'

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
      <div className='navbarDiv'>
          <NavLink to='/' exact={true} activeClassName='active' className="meScroll">
            meScroll
          </NavLink>
          <LogoutButton />
          <NavLink to={`/users/${sessionUser?.id}`} exact={true} activeClassName='active'>
            <img src={profileIcon} className='my-profile-btn'></img>
          </NavLink>
          <img className='create-post-btn'onClick={openCreateForm} src={createPostbtn}></img>
          <Modal isOpen={showCreateForm}>
            <button className='modal-x' onClick={closeCreateForm}>x</button>
            <PostForm closeCreateForm={closeCreateForm}/>
          </Modal>
          <NavLink to='/'>
            <img className='homebutton' src={homebutton}></img>
          </NavLink>
          <a href="https://www.linkedin.com/in/joshua-salcido-57036a215/">
            <img className='linkedIn-button' src={linkedInLogo}></img>
          </a>
          <a href="https://github.com/joshsalcido">
            <img className='github-button' src={githubLogo}></img>
          </a>
      </div>
    </nav>
  );
}

export default NavBar;
