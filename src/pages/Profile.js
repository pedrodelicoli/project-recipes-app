import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import '../styles/content.css';

function Profile() {
  function showEmail() {
    const emailUser = localStorage.getItem('user');
    const emailObject = JSON.parse(emailUser);
    if (emailObject !== null) {
      return emailObject.email;
    }
  }

  function handleClick() {
    return localStorage.clear();
  }

  return (
    <div>
      <Header text="Perfil" />
      <section className="content btns-profile">
        <div className="btn-center">
          <h1 id="profile-email" data-testid="profile-email">{showEmail()}</h1>
        </div>
        <Link to="/receitas-feitas">
          <Button
            testID="profile-done-btn"
            className="btn-center"
          >
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button
            testID="profile-favorite-btn"
            className="btn-center"
          >
            Receitas Favoritas
          </Button>
        </Link>
        <Link to="/">
          <Button
            handleClick={ handleClick }
            className="btn-center"
            testID="profile-logout-btn"
          >
            Sair
          </Button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
