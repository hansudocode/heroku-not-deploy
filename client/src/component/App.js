import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
// import Recipe from "./Recipe";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
// import "../css/index.css";
import "../css/styles.css";
import RecipeMaintenance from './RecipeMaintenance';
import Header from "./Header";
import Nav from "./Nav";


const navItems = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Maintenance',
    path: 'maintenance'
  }
];
function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(json => {
        setRecipes(json);
      });
  }, []);

  // const removeRecipe = index => {
  //   console.log(index);
  //   const recipes = [...recipes];
  //   recipes.splice(index, 1);
  //   console.log(recipes);
  //   setRecipes(recipes);
  // };
  // app.delete('/api/recipes/:id', recipeControllers.delete);
  const removeRecipe = (meta) => {
    const { id, index } = meta
    console.log(meta)
    fetch(`/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        console.log(meta)
        if (res.deletedCount > 0) {
          console.log('res.deletedCount', res.deletedCount)
          const newRecipes = [...recipes];
          console.log(newRecipes.length);
          newRecipes.splice(index, 1);
          console.log(newRecipes.length);
          setRecipes(newRecipes)
        }
      });
  };

  const addRecipe = recipe => {
    fetch(`/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    })
      .then(response => response.json())
      .then(recipe => console.log(recipe));
  };

  const importRecipes = limit => {
    fetch(`/api/import/${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => console.log(res));
  };

  const removeAll = () => {
    fetch(`/api/killall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(res => console.log(res));
  };

  return (
    <div id="app-root">
      <Header siteTitle="Recipes!" />
      <Nav navItems={navItems}/>
      <Router>
        <Recipes path="/" recipes={recipes} removeRecipe={removeRecipe}/>
        <Recipes path="/type/:type" recipes={recipes} />
        <RecipeDetail path="/recipe/:recipeId" recipes={recipes} />
        <RecipeMaintenance path='/maintenance' addRecipe={addRecipe} importRecipes={importRecipes} removeAll={removeAll}/>
      </Router>
    </div>
  );
}

export default App;

/*
maintenance page using functional components
master detail page
do more to it

ideas:
  - Main page:
    - Maintenance mode with params?
      - Show edit button per recipe
      - Show import from NYT button
      - Show delete button
      - Show Add button
        - Show Add form
    - Sort button?
    - Pagination
*/