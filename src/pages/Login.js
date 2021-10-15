import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from '../components';
import kitutzApp from '../images/nameApp.png';
import '../styles/login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [focusPassword, setFocusPassword] = useState('no');
  const [focusEmail, setFocusEmail] = useState();

  const focusOn = (func) => {
    func('yes');
  };

  const focusOut = (func) => {
    func('no');
  };

  const changeClassPassword = () => {
    const hand = document.querySelectorAll('.hand');
    const arm = document.querySelectorAll('.arm');
    //   console.log(arm)
    if (focusPassword === 'yes') {
      hand.forEach((div) => div.classList.add('password'));
      arm.forEach((div) => div.classList.add('password'));
    } else {
      hand.forEach((div) => div.classList.remove('password'));
      arm.forEach((div) => div.classList.remove('password'));
    }
  };

  const changeClassEmail = () => {
    const smile = document.querySelector('.smile');
    if (focusEmail === 'yes') {
      smile.classList.add('email');
    }
    if (focusEmail === 'no' && !user.email) {
      smile.classList.remove('email');
    }
  };

  useEffect(() => {
    changeClassPassword();
    changeClassEmail();
  }, [focusPassword, focusEmail, user]);

  const passwordCorrect = () => {
    const passwordLength = 6;
    if (user.password !== undefined && user.password.length > passwordLength) {
      return true;
    }
    return false;
  };

  const validateEmail = () => {
    const emailCorrect = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailCorrect.test(user.email);
  };

  const handleClick = () => {
    const emailUser = { email: user.email };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(emailUser));
    history.push('/comidas');
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value });
  };

  return (
    <section className="login-body">
      <div className="smile" />
      <div className="chef">
        <div className="hand" />
        <div className="hand hand-r" />
        <div className="arms">
          <div className="arm" />
          <div className="arm arm-r" />
        </div>
      </div>
      <div className="form">
        <img className="kitutz" src={ kitutzApp } alt="Kitutz" />
        <div className="control">
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              placeholder="Email"
              data-testid="email-input"
              type="text"
              onChange={ handleChange }
              onClick={ () => focusOn(setFocusEmail) }
              onBlur={ () => focusOut(setFocusEmail) }
            />
          </label>
        </div>
        <div className="control">
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              placeholder="Password"
              data-testid="password-input"
              type="password"
              onChange={ handleChange }
              onClick={ () => focusOn(setFocusPassword) }
              onBlur={ () => focusOut(setFocusPassword) }
            />
          </label>
        </div>
        <div className="control-submit">
          <Button
            disabled={ !(validateEmail() && passwordCorrect()) }
            handleClick={ handleClick }
            testID="login-submit-btn"
            className="login-btn"
          >
            Entrar
          </Button>
        </div>
      </div>
    </section>
  );
};

const { func, string, bool } = PropTypes;

Button.propTypes = ({
  handleClick: func,
  handleChange: func,
  validateEmail: func,
  passwordCorrect: func,
  testID: string,
  disabled: bool,
}).isRequired;

export default Login;
