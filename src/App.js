import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './Context/Provider';
import {
  Login,
  Foods,
  Drinks,
  FoodsRecipes,
  FoodsProcess,
  DrinksRecipes,
  DrinksProcess,
  Explorer,
  ExplorerFoods,
  ExplorerDrinks,
  ExplorerFoodsByIngredients,
  ExplorerDrinksByIngredients,
  ExplorerFoodsByOrigin,
  Profile,
  RecipesDone,
  FavoritesRecipes } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
          <Route path="/receitas-feitas" component={ RecipesDone } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/explorar/comidas/area" component={ ExplorerFoodsByOrigin } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorerDrinksByIngredients }
          />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorerFoodsByIngredients }
          />
          <Route path="/explorar/bebidas" component={ ExplorerDrinks } />
          <Route path="/explorar/comidas" component={ ExplorerFoods } />
          <Route path="/explorar" component={ Explorer } />
          <Route path="/bebidas/:id/in-progress" component={ DrinksProcess } />
          <Route path="/comidas/:id/in-progress" component={ FoodsProcess } />
          <Route path="/bebidas/:id" component={ DrinksRecipes } />
          <Route path="/comidas/:id" component={ FoodsRecipes } />
          <Route path="/bebidas" component={ Drinks } />
          <Route path="/comidas" component={ Foods } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

// Tela de login: /;
// Tela principal de receitas de comidas: /comidas;
// Tela principal de receitas de bebidas: /bebidas;
// Tela de detalhes de uma receita de comida: /comidas/{id-da-receita};
// Tela de detalhes de uma receita de bebida: /bebidas/{id-da-receita};
// Tela de receita em processo de comida: /comidas/{id-da-receita}/in-progress;
// Tela de receita em processo de bebida: /bebidas/{id-da-receita}/in-progress;
// Tela de explorar: /explorar;
// Tela de explorar comidas: /explorar/comidas;
// Tela de explorar bebidas: /explorar/bebidas;
// Tela de explorar comidas por ingrediente: /explorar/comidas/ingredientes;
// Tela de explorar bebidas por ingrediente: /explorar/bebidas/ingredientes;
// Tela de explorar comidas por local de origem: /explorar/comidas/area;
// Tela de perfil: /perfil;
// Tela de receitas feitas: /receitas-feitas;
// Tela de receitas favoritas: /receitas-favoritas.
