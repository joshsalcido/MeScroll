import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../LandingPage/LandingPage.css'

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
      <form onSubmit={onLogin}>
        <h1 className='login-logo'>meScroll</h1>
        <h4 className='signup-subtext'>Sign up for your own meScroll and view posts from all your buddies!</h4>
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
    </>
  );
};

export default LoginForm;
