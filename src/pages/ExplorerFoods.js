import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/content.css';

function ExplorerFoods() {
  const history = useHistory();
  useEffect(() => {
    localStorage.clear();
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((r) => r.json())
      .then((rJson) => rJson.meals[0].idMeal)
      .then((id) => localStorage.setItem('idFood', id));
  }, []);

  return (
    <div className="explore-page">
      <Header text="Explorar Comidas" />
      <section className="content btns-explore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
          className="btn-center"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
          className="btn-center"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          // onClick={ fetchRandom }
          onClick={ () => history.push(`/comidas/${localStorage.getItem('idFood')}`) }
          className="btn-center"
        >
          Me Surpreenda!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;

// const [food, setfood] = useState();

// async function fetchAPI() {
//   const response = await fetch('www.themealdb.com/api/json/v1/1/random.php')
//     .then((data) => data.json())
//     .then((e) => e.meals.idMeal);
//   console.log(response);
//   return response;
// }

// useEffect(() => {
//   fetchAPI().then((resp) => setfood(resp));
// }, []);
