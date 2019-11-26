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
    getRecipes();
  }, []);

  const getRecipes = () => {
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(json => {
        setRecipes(json);
      });
  }
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
        if (res.deletedCount > 0) {
          console.log('res.deletedCount', res.deletedCount)
          const newRecipes = [...recipes];
          newRecipes.splice(index, 1);
          setRecipes(newRecipes)
        }
      });
  };

  // const addRecipe = recipe => {
  //   fetch(`/api/recipes`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(recipe)
  //   })
  //     .then(response => response.json())
  //     .then(recipe => console.log(recipe))
  //     .then(()=> getRecipes())
  // };
  const addRecipe = recipe => {
    fetch(`/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    })
      .then(response => response.json())
      .then(recipe => {
        console.log(recipe)
        setRecipes([...recipes, recipe])
      })
      .then(()=> getRecipes())
  };

  const importRecipes = () => {
    fetch(`/api/import`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => 
        console.log(response.json())
        
      )
      .then(res => console.log(res))
      .then(getRecipes())
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
        <RecipeMaintenance path='/maintenance' addRecipe={addRecipe} importRecipes={importRecipes} removeAll={removeAll} getRecipes={getRecipes}/>
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