import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../LandingPage/LandingPage.css'
import landingVideo from "../../../src/mscrlVid.mov"
import githublogo from "../LandingPage/github-sign.png"
import linkedinlogo from "../LandingPage/linkedin (1).png"
import angellogo from "../LandingPage/angelist.png"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [demo, setDemo] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

//  const demoLogin = async (e) => {
//   setEmail('demo@aa.io')
//   setPassword('password')
//  }


  const onLogin = async (e) => {
    e.preventDefault();
    if (demo){
      dispatch(login('demo@aa.io', 'password'))
    } else {
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/myfeed' />;
  }

  return (
    <>
    <div className='top-div-landing'></div>
    <div className='login-container'>
      <div className='login-media'>
        <div className='video-div'>
          <video autoPlay={true} loop muted className='video-tag'>
            <source src={landingVideo} type="video/mp4"></source>
          </video>
        </div>
        <div className='login-form-div'>
          <form onSubmit={onLogin}>
            <h1 className='login-logo'>meScroll</h1>
            <h4 className='signup-subtext'>Login to your meScroll account and start viewing posts from all your buddies!</h4>
            <ul className='error-messages'>
              {errors.map((error, ind) => (
                <li key={ind}>{error}</li>
              ))}
            </ul>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button type='submit'>Login</button>
              <span>- Or -</span>
              <button onClick={() => setDemo(true)}>Continue as Guest</button>
            </div>
            <span>Don't have an account? {<NavLink style={{textDecoration: 'none', color: '#ffb4a5'}} to='/sign-up'>Sign Up</NavLink>}</span>
          </form>
        </div>
        <div className='languages-div'>
          <p className='language-p'>Javascript</p>
          <p className='language-p'>Python</p>
          <p className='language-p'>React</p>
          <p className='language-p'>Redux</p>
          <p className='language-p'>Flask</p>
          <p className='language-p'>SQLAlchemy</p>
          <p className='language-p'>Docker</p>
          <p className='language-p'>AWS</p>
        </div>
        <div className='profile-links'>
          <a style={{textDecoration: "none"}} className='developer-links' href='https://github.com/joshsalcido' target="_blank" rel="noopener noreferrer">
            <img style={{width: "12px", height: "12px", marginRight:"5px"}} src={githublogo}></img>
             Github</a>
          <a style={{textDecoration: "none"}} className='developer-links' href='https://www.linkedin.com/in/joshua-salcido-57036a215/' target="_blank" rel="noopener noreferrer">
            <img style={{width: "12px", height: "12px", marginRight:"5px"}} src={linkedinlogo}></img>
            LinkedIn</a>
          <a style={{textDecoration: "none"}} className='developer-links' href='https://angel.co/u/joshua-salcido-1' target="_blank" rel="noopener noreferrer">
          <img style={{width: "12px", height: "12px", marginRight:"5px"}} src={angellogo}></img>
            AngelList</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
