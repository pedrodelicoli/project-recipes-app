import { useContext, useEffect } from 'react';
import Context from '../Context/Context';

const useRecipesSearch = (value, input, page) => {
  const { data } = useContext(Context);
  const { recipes, setRecipes } = useContext(Context);

  useEffect(() => {
    const arrayValues = ['ingredient', 'nameSearch', 'firstLetter'];
    const arrayUrl = [
      `https://www.${page}db.com/api/json/v1/1/filter.php?i=${input}`,
      `https://www.${page}db.com/api/json/v1/1/search.php?s=${input}`,
      `https://www.${page}db.com/api/json/v1/1/search.php?f=${input}`];
    const index = arrayValues.indexOf(value);
    const url = arrayUrl[index];

    async function fetchResult() {
      const result = await (await fetch(url)).json();
      setRecipes(result);
    }
    if (data.search && data.text) {
      fetchResult();
    }
  }, [data]);

  return recipes;
};

export default useRecipesSearch;
