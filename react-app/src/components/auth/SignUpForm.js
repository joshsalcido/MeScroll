import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import '../LandingPage/LandingPage.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed_Password, setConfirmedPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
      const data = await dispatch(signUp(username, full_name, email, password, confirmed_Password ));
      if (data) {
        setErrors(data)
      }
    // }
    // errors.push('Confirmed Password does not match')
  };

  useEffect(()=>{

  }, [errors])
  const demoLogin = async (e) => {
    // e.preventDefault();

      await dispatch(login('demo@aa.io', 'password'))

  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmedPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className="top-div-signup-landing"></div>
    <form onSubmit={onSignUp} className="signup-form">
      <h1>meScroll</h1>
      <h4>Sign up to see posts from all your buddies!</h4>
      <button type="button" onClick={()=> demoLogin()}>Continue as Guest</button>
      <br></br>
      <span>- Or -</span>
      <ul className="error-messages">
        {errors && errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}
      </ul>
      <div>
        <label>Email</label>
        <input
          required
          placeholder='Email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Full Name</label>
        <input
          required
          placeholder='Full Name'
          type='text'
          name='username'
          onChange={updateFullName}
          value={full_name}
        ></input>
      </div>
      <div>
        <label>Username</label>
        <input
          required
          placeholder='Username'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          required
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input

          placeholder='Confirm Password'
          type='password'
          name='repeat_password'
          onChange={updateConfirmPassword}
          value={confirmed_Password}
          required
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
      <span>Have an account? {<NavLink to='/login'>Log in</NavLink>}</span>
    </form>
    </>
  );
};

export default SignUpForm;
