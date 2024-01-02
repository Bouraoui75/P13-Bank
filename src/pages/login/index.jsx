import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../tools/slices/authSlice';
import { useState, useEffect } from 'react';
import style from './Login.module.scss';
import { Base } from '../../layout/base';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    id: '',
    password: '',
  });

  // If user is already logged in, redirect to profile page, so they can't access login page
  useEffect(() => {
    if (auth.token) {
      navigate('/profile');
    }
  }, [auth.token, navigate]);

  // After submitting login form, use dispatch to send user data to authSlice to be processed by loginUser function
  // And then loginUser function will send a request to server to get token and user data from database 
  // If login is successful, loginUser function will save token and user data to localStorage
  // And then loginUser function will redirect user to profile page
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <Base>
      <main className={`background ${style.containerLogin}`}>
        <section className={style.signInContent}>
          <i className={`fa fa-user-circle sign-in-icon ${style.icon}`}></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className={style.inputWrapper}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className={style.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className={style.containerRemember}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className={style.signInButton}>
              {auth.loginStatus === 'pending' ? 'Submitting...' : 'Login'}
            </button>
            {auth.loginStatus === 'rejected' ? <p>{auth.loginError}</p> : null}
          </form>
        </section>
      </main>
    </Base>
  );
};

export default Login;
