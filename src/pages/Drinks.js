import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Context from '../Context/Context';
import useRecipesSearch from '../Hooks/useRecipesSearch';
import useFetchRecipes from '../Hooks/useFetchRecipes';
import useFetchFilter from '../Hooks/useFetchFilter';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const urlDrink = 'thecocktail';
  const { data, recipes, category, filter, setFilter } = useContext(Context);
  const history = useHistory();
  const secondButton = true;
  useFetchRecipes(urlDrink);
  useRecipesSearch(data.search, data.text, urlDrink);
  useFetchFilter(urlDrink);

  const renderDrinks = () => {
    const magic = 12;
    if (recipes.drinks === null) {
      return (
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
    if (recipes.drinks.length === 1 && filter === 'All') {
      const id = recipes.drinks[0].idDrink;
      return history.push(`./bebidas/${id}`);
    }
    if (recipes.drinks.length > magic) {
      const cooktail = recipes.drinks.slice(0, magic);
      return cooktail.map((recipe, index) => (
        <Link
          key={ index }
          to={ `/bebidas/${recipe.idDrink}` }
          className="card"
        >
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
              className="foods"
            />
            <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
          </div>
        </Link>
      ));
    }
    return (
      recipes.drinks.map((drink, index) => (
        <Link
          key={ index }
          to={ `/bebidas/${drink.idDrink}` }
          className="card"
        >
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
              className="foods"
            />
            <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
          </div>
        </Link>
      ))
    );
  };

  const ClickCategory = ({ target }) => (
    target.innerText === filter ? setFilter('All') : setFilter(target.innerText));

  const renderButtons = () => {
    if (category.drinks !== undefined) {
      const magic2 = 5;
      const list = category.drinks;
      const listButton = list.slice(0, magic2);
      return listButton.map((button) => (
        <Button
          key={ button.strCategory }
          className={ button.strCategory }
          testID={ `${button.strCategory}-category-filter` }
          handleClick={ ClickCategory }
        >
          {button.strCategory}
        </Button>
      ));
    }
  };

  return (
    <section>
      <Header text="Bebidas" secondButton={ secondButton } />
      <section className="content">
        <div className="btn-category">
          <Button
            testID="All-category-filter"
            handleClick={ ClickCategory }
          >
            All
          </Button>
          { category !== undefined ? renderButtons() : null}
        </div>
        <div className="cards">
          { recipes.drinks !== undefined ? renderDrinks() : null }
        </div>
      </section>
      <Footer />
    </section>
  );
}

export default Drinks;
