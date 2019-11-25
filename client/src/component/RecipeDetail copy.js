import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { getImage, decode } from './utils';

const setBackground = (imageUrl) =>  {
  // background: url(http://img0.mxstatic.com/wallpapers/6cba18f8e9c95b677bcc999c1e73e496_large.jpeg);
  return {
  background: `url(${imageUrl}) center no-repeat`}
}

function RecipeDetail(props) {
  const recipeId = props.recipeId;
  const currRecipe = props.recipes.filter(recipe => recipe._id === recipeId);
  console.log(currRecipe[0]);

  // const buildPrepList = ({step}) => step && <li key={step}>{decode(step)}</li>
  // const buildIngredientList = (ingredient) => ingredient && <li key={ingredient} dangerouslySetInnerHTML={{__html: decode(ingredient)></li>
  return (
    <div className='site-wrap'>
    {/* <Link to="/">Home</Link> */}
      {currRecipe.map(item => (
        <div key={item._id} className='recipeDetails' style={setBackground(getImage(item.image, 'large'))}>
          <div >
          {/* <header style={titleStyle(getImage(item.image, 'large'))}>asd</header> */}
          {/* <img
            src={getImage(item.image, 'large')}
            alt={decode(item.title)}
          /> */}
          <header >{item.title}</header>
            <h1>{item.title}</h1>
            {/* <p>{item.description}</p> */}
            <p dangerouslySetInnerHTML={{__html: decode(item.description)}}></p>
            <h3>Ingredients</h3>
            <ul>
              {item.ingredients.map(ingredient => <li key={ingredient} dangerouslySetInnerHTML={{__html: decode(ingredient)}}></li>)}
            </ul>
            <h3>Preparation</h3>
            <ul>
              {item.preparation.map(prep => <li key={prep.step} dangerouslySetInnerHTML={{__html: decode(prep.step)}}></li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetail;