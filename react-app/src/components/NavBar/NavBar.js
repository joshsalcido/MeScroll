
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

  const [showCreateForm, setShowCreateForm] = useState(false);


  Modal.setAppElement('body');

  function openCreateForm(){
    setShowCreateForm(true)
  }
  function closeCreateForm(){
    setShowCreateForm(false)
  }

  const customStyles = {
    overlay: {
        background: 'rgba(0,0,0,0.1)'
      },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '33rem',
        padding: '4px',
        paddingBottom: '0px',
        borderRadius: '12px',

    }
  }


  return (
    <nav className='navvy'>
      <div className='navbarDiv'>
          <NavLink to='/' exact={true} activeClassName='active' className="meScroll">
            meScroll
          </NavLink>
          <LogoutButton />
          <NavLink to={`/users/${sessionUser?.id}`} exact={true} activeClassName='active'>
            <img src={profileIcon} className='my-profile-btn' alt='profile icon'></img>
          </NavLink>
          <img className='create-post-btn'onClick={openCreateForm} src={createPostbtn} alt='plus button'></img>
          <Modal isOpen={showCreateForm} style={customStyles}>
            <button className='modal-x' onClick={closeCreateForm}>x</button>
            <PostForm closeCreateForm={closeCreateForm}/>
          </Modal>
          <NavLink to='/'>
            <img className='homebutton' src={homebutton} alt='home icon'></img>
          </NavLink>
          <a href="https://www.linkedin.com/in/joshua-salcido-57036a215/" target="_blank" rel="noopener noreferrer">
            <img className='linkedIn-button' src={linkedInLogo} alt='linkedin icon'></img>
          </a>
          <a href="https://github.com/joshsalcido" target="_blank" rel="noopener noreferrer">
            <img className='github-button' src={githubLogo} alt='github icon'></img>
          </a>
      </div>
    </nav>
  );
}

export default NavBar;
