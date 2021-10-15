import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Context from '../Context/Context';
import Header from '../components/Header';
import useRecipesSearch from '../Hooks/useRecipesSearch';
import useFetchRecipes from '../Hooks/useFetchRecipes';
import useFetchFilter from '../Hooks/useFetchFilter';
import Footer from '../components/Footer';
import '../styles/content.css';

function Foods() {
  const { recipes, data, category, filter, setFilter } = useContext(Context);
  const history = useHistory();
  const urlFood = 'themeal';
  const secondButton = true;
  useFetchRecipes(urlFood, 'meals');
  useRecipesSearch(data.search, data.text, urlFood);
  useFetchFilter(urlFood);

  const renderFoods = () => {
    const magic = 12;
    if (recipes.meals === null) {
      return (
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
    if (recipes.meals.length === 1 && filter === 'All') {
      const id = recipes.meals[0].idMeal;
      return history.push(`./comidas/${id}`);
    }
    if (recipes.meals.length > magic) {
      const foods = recipes.meals.slice(0, magic);
      return foods.map((food, index) => (
        <Link
          key={ index }
          to={ `/comidas/${food.idMeal}` }
          className="card"
        >
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid={ `${index}-card-img` }
              className="foods"
            />
            <h3 data-testid={ `${index}-card-name` }>{food.strMeal}</h3>
          </div>
        </Link>
      ));
    }
    return (
      recipes.meals.map((recipe, index) => (
        <Link
          key={ index }
          to={ `/comidas/${recipe.idMeal}` }
          className="card"
        >
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
              className="foods"
            />
            <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
          </div>
        </Link>
      ))
    );
  };

  const ClickCategory = ({ target }) => (
    target.innerText === filter ? setFilter('All') : setFilter(target.innerText));

  const renderButtons = () => {
    if (category.meals !== undefined) {
      const magic2 = 5;
      const list = category.meals;
      const listButton = list.slice(0, magic2);
      return listButton.map((button) => (
        <Button
          key={ button.strCategory }
          testID={ `${button.strCategory}-category-filter` }
          handleClick={ ClickCategory }
        >
          {button.strCategory}
        </Button>
      ));
    }
  };

  return (
    <div>
      <Header text="Comidas" secondButton={ secondButton } />
      <section className="content">
        <div className="btn-category">
          <Button
            testID="All-category-filter"
            handleClick={ ClickCategory }
          >
            All
          </Button>
          { category !== undefined ? renderButtons() : null }
        </div>
        <div className="cards">
          { recipes.meals !== undefined ? renderFoods() : null }
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Foods;
