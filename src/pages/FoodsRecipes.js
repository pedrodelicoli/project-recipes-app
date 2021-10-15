import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context/Context';
import Button from '../components/Button';
import useFetchRecipes from '../Hooks/useFetchRecipes';
import FavoriteMeal from '../components/FavoriteMeal';
import '../styles/recipes.css';
import '../styles/content.css';

function FoodsRecipes(props) {
  const { recipes, setFavorite, setId } = useContext(Context);
  const urlDrink = 'thecocktail';
  const [details, setDetails] = useState();
  const [message, setMessage] = useState(false);
  // const [progress, setProgress] = useState(false);

  const history = useHistory();
  const { match: { params: { id } } } = props;
  useFetchRecipes(urlDrink);

  // const recipeInProgress = () => {
  //   const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (storage) {
  //     const result = Object.keys(storage.meals).find((item) => item === id);
  //     if (result) {
  //       setProgress(true);
  //     }
  //   }
  // };

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      const obj = result.meals;
      setDetails(obj[0]);
      setFavorite(obj[0]);
      setId(obj[0].idMeal);
    }
    fetchResult();
    // recipeInProgress();
  }, []);

  const renderDrinks = () => {
    const magic = 6;
    if (recipes.drinks.length > magic) {
      const cooktail = recipes.drinks.slice(0, magic);
      return cooktail.map((recipe, index) => (
        <Link
          key={ index }
          to={ `/bebidas/${recipe.idDrink}` }
          className="card"
        >
          <div data-testid={ `${index}-recomendation-card` }>
            <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
              className="drinks"
            />
          </div>
        </Link>
      ));
    }
  };

  const renderDetails = () => {
    const urlShare = window.location.href;
    const video = details.strYoutube;
    const youtube = video.replace('watch?v=', 'embed/');
    // https://qastack.com.br/programming/20498831/refused-to-display-in-a-frame-because-it-set-x-frame-options-to-sameorigin
    if (details !== undefined) {
      return (
        <section className="recipe-details">
          <img
            src={ details.strMealThumb }
            alt=""
            data-testid="recipe-photo"
            className="recipe-img"
          />
          <h2
            data-testid="recipe-title"
            className="recipe-title"
          >
            {details.strMeal}
          </h2>
          <div className="info-recipe">
            <h4
              data-testid="recipe-category"
              className="recipe-category"
            >
              { details.strCategory }
            </h4>
            <div className="btns-recipe">
              <div className="share-message">
                <Button
                  testID="share-btn"
                  className="share-btn"
                  handleClick={ () => {
                    navigator.clipboard.writeText(urlShare);
                    setMessage(true);
                  } }
                >
                  Compartilhar
                </Button>
                { message ? <h5>Link copiado!</h5> : null }
              </div>
              <FavoriteMeal />
            </div>
          </div>
          <ul className="recipe-list">
            <h3 className="list-title">Ingredientes</h3>
            {Object.keys(details)
              .filter((detail) => detail.includes('strIngredient'))
              .filter((ing) => details[ing] !== '')
              .map((ingredient, i) => (
                <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  {details[`strMeasure${i + 1}`]}
                  {details[`strMeasure${i + 1}`] ? ' of ' : null}
                  {details[ingredient]}
                </li>))}
          </ul>
          <p
            data-testid="instructions"
            className="recipe-text"
          >
            { details.strInstructions }
          </p>
          <iframe
            src={ youtube }
            data-testid="video"
            title=" video teste"
            className="recipe-video"
          />
          <Button
            testID="start-recipe-btn"
            className="initRecipes btn-center"
            handleClick={ () => history.push(`/comidas/${id}/in-progress`) }
          >
            Iniciar Receita
          </Button>
          <div className="carousel cards">
            <h3 className="recomendation">Recomendações</h3>
            { recipes.drinks !== undefined ? renderDrinks() : null }
          </div>
        </section>
      );
    }
  };

  return (
    <div>
      { details ? renderDetails() : null }
    </div>
  );
}

FoodsRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodsRecipes;
