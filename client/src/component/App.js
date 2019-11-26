import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
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

  const removeRecipe = (meta) => {
    const { id } = meta
    console.log('removeRecipe', meta)
    fetch(`/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        console.log('removeRecipe.res', res)
        console.log('removeRecipe.res.deletedCount', res.deletedCount)
        if (res.deletedCount > 0) {
          setRecipes(recipes => recipes.filter(recipes => recipes._id !== id))
        }
      });
  };

  const addRecipe = recipe => {
    console.log('addRecipe.recipe', recipe)
    const {title, description, ingredients, preparation} = recipe
    if (title.length > 0 && description.length > 0 && ingredients.length > 0 && preparation.length > 0) {
      fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recipe)
      })
      .then(response => response.json())
      .then(recipe => {
        console.log('addRecipe.recipe', recipe)
        setRecipes([...recipes, recipe])
      })
    }
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

  - Main page:
    - Show delete button
  - RecipesDetails page:
    - Cap first letter in desc
    - Handle html content from Api
    - Map prep and ingredients to list
  - Maintenance page:
    - Show edit button per recipe
    - Show import from campbellsApi
    - Show Add form
      - Ingredients (split by newline)
      - prep (split by newline)
*/