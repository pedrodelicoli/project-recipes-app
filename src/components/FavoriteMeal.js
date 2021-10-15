import React, { useState, useContext, useEffect } from 'react';
import Context from '../Context/Context';
import Button from './Button';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteMeal() {
  const { id, favorite } = useContext(Context);
  const [favHeart, setFavHeart] = useState(false);
  useEffect(() => {
    const listFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newArray = listFavorite.filter((list) => list.id === id);
    if (newArray[0]) {
      return setFavHeart(true);
    }
  }, [id]);

  const handleFavorite = () => {
    const favorited = {
      id: favorite.idMeal,
      type: 'comida',
      area: favorite.strArea,
      category: favorite.strCategory,
      alcoholicOrNot: '',
      name: favorite.strMeal,
      image: favorite.strMealThumb,
    };

    if (favHeart === false) {
      const recipesFavorited = JSON.parse(localStorage.getItem('favoriteRecipes')
        || '[]');
      recipesFavorited.push(favorited);
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFavorited));
      setFavHeart(true);
    }
    if (favHeart === true) {
      const listFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newArray = listFavorite.filter((list) => list.id !== favorited.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setFavHeart(false);
    }
  };

  return (
    <Button
      handleClick={ handleFavorite }
      className="fav-btn"
      image={ favHeart ? blackHeartIcon : whiteHeartIcon }
    >
      {favHeart ? <img
        alt="liked"
        className="img-heart"
        data-testid="favorite-btn"
        src={ blackHeartIcon }
      /> : <img
        alt="wthlike"
        data-testid="favorite-btn"
        className="img-heart"
        src={ whiteHeartIcon }
      />}
    </Button>
  );
}

export default FavoriteMeal;
