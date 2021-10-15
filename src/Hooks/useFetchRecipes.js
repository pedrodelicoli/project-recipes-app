import { useContext, useEffect } from 'react';
import Context from '../Context/Context';

const useFetchRecipes = (page) => {
  const { setRecipes, setCategory } = useContext(Context);
  const url = `https://www.${page}db.com/api/json/v1/1/search.php?s=`;
  const category = `https://www.${page}db.com/api/json/v1/1/list.php?c=list`;

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await (await fetch(url)).json();
      setRecipes(result);
    };

    const fetchCategory = async () => {
      const result = await (await fetch(category)).json();
      setCategory(result);
    };

    fetchCategory();
    fetchRecipes();
  }, []);
};

export default useFetchRecipes;
