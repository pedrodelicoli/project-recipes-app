import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context/Context';
import Button from './Button';
import Input from './Input';
import profileIcon from '../images/user.png';
import searchIcon from '../images/zoom.png';
import '../styles/header.css';

function Header({ text, secondButton }) {
  const { data, setData } = useContext(Context);
  const [render, setRender] = useState(false);
  const handleInput = () => (render ? setRender(false) : setRender(true));
  const [input, setInput] = useState({
    inputText: '',
    inputSearch: '',
  });

  useEffect(() => {}, [render]);

  const handleChange = (e) => {
    setInput({
      ...input,
      inputText: e.target.value });
  };

  const handleCheck = (e) => {
    setInput({
      ...input,
      inputSearch: e.target.value });
  };

  const handleClick = () => {
    if (input.inputSearch === 'firstLetter' && input.inputText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setData({
      text: input.inputText,
      search: input.inputSearch,
    });
  };

  useEffect(() => {}, [data]);

  return (
    <div className="menu-sup">
      <header className="header">
        <Link to="/perfil">
          <Button
            className="icon"
          >
            {/* // handleClick={}
            testID="profile-top-btn"
            image={ profileIcon } */}
            <img
              className="icon"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profile"
            />
          </Button>
        </Link>
        <h1 data-testid="page-title">{ text }</h1>
        {secondButton
          ? (
            <Button
              handleClick={ handleInput }
              className="icon"
              // testID="search-top-btn"
              // image={ searchIcon }
            >
              <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
            </Button>)
          : <div />}
      </header>
      {render
        ? (
          <div className="search-bar">
            <div className="search-text">
              <Input
                placeholder="Procurar"
                name="search"
                inputType="text"
                testID="search-input"
                handleChange={ handleChange }
              />
            </div>
            <div className="radio-btn">
              <Input
                labelText="Ingrediente"
                value="ingredient"
                id="search-ingredient"
                name="search-radio"
                inputType="radio"
                testID="ingredient-search-radio"
                handleChange={ handleCheck }
              />
              <Input
                labelText="Nome"
                value="nameSearch"
                id="search-name"
                name="search-radio"
                inputType="radio"
                testID="name-search-radio"
                handleChange={ handleCheck }
              />
              <Input
                labelText="Primeira letra"
                value="firstLetter"
                id="search-letter"
                name="search-radio"
                inputType="radio"
                testID="first-letter-search-radio"
                handleChange={ handleCheck }
              />
            </div>
            <Button
              testID="exec-search-btn"
              handleClick={ handleClick }
            >
              Buscar
            </Button>
          </div>)
        : null}
    </div>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
  secondButton: PropTypes.bool.isRequired,
};

export default Header;
