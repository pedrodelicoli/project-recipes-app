import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider(props) {
  const [data, setData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState();
  const [filter, setFilter] = useState('All');
  const [id, setId] = useState('');
  const [favorite, setFavorite] = useState();
  const [focusFooter, setFocusFooter] = useState();
  // const [favoriteIng, setFavoriteIng] = useState({
  //   cocktails: {
  //     [favorite.idDrink]: [],
  //   },
  //   meals: {
  //     [favorite.idMeal]: [],
  //   },
  // });

  const { children } = props;
  const contextValue = {
    data,
    setData,
    recipes,
    setRecipes,
    category,
    setCategory,
    id,
    setId,
    filter,
    setFilter,
    favorite,
    setFavorite,
    // favoriteIng,
    // setFavoriteIng,
    focusFooter,
    setFocusFooter,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
