import { useEffect, useContext } from 'react';
import Context from '../Context/Context';

const useFetchFilter = (page) => {
  const { setRecipes, filter } = useContext(Context);
  const url1 = `https://www.${page}db.com/api/json/v1/1/filter.php?c=${filter}`;
  const url2 = `https://www.${page}db.com/api/json/v1/1/search.php?s=`;

  useEffect(() => {
    const fetchAPI = async (url) => {
      try {
        const result = await fetch(url);
        const json = await result.json();
        setRecipes(json);
      } catch (error) {
        console.log(error);
      }
    };

    if (filter === 'All') {
      fetchAPI(url2);
    } else {
      fetchAPI(url1);
    }
  }, [filter]);
};

export default useFetchFilter;
