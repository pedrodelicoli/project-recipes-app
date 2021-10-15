import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/content.css';

function ExplorerDrinks() {
  const history = useHistory();
  useEffect(() => {
    localStorage.clear();
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((r) => r.json())
      .then((rJson) => rJson.drinks[0].idDrink)
      .then((id) => localStorage.setItem('idDrink', id));
  }, []);

  return (
    <div className="explore-page">
      <Header text="Explorar Bebidas" />
      <section className="content btns-explore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          className="btn-center"
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          className="btn-center"
          onClick={ () => history.push(`/bebidas/${localStorage.getItem('idDrink')}`) }
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExplorerDrinks;
