import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { getImage, decode } from './utils';
import { relative } from "path";

const setBackground = (imageUrl) =>  {
  // background: url(http://img0.mxstatic.com/wallpapers/6cba18f8e9c95b677bcc999c1e73e496_large.jpeg);
  return {
    background: `url(${imageUrl}) center no-repeat`,
    position: 'relative',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    opacity: 1,
    position: 'sticky',
    // filter: 'blur(3px)',
    // backgroundColor: '#eee',
  }
}
const style = {
  h1: {
    fontSize: '2rem',
  }
}

function RecipeDetail(props) {
  const recipeId = props.recipeId;
  console.log(props)
  const currRecipe = props.recipes.filter(recipe => recipe._id === recipeId);
  console.log(currRecipe[0]);
  // const {campbellsId} = currRecipe[0];

  // const buildPrepList = ({step}) => step && <li key={step}>{decode(step)}</li>
  // const buildIngredientList = (ingredient) => ingredient && <li key={ingredient} dangerouslySetInnerHTML={{__html: decode(ingredient)></li>

  useEffect(() => {
    
    // document.getElementById('app-header').style.filter = 'blur(5px)'
    // document.getElementById('app-header').style.filter = 'blur(5px)'
    window.scrollTo(0,0);
    if (currRecipe.length > 0) {
      document.getElementById('app-header').style = setBackground(getImage(currRecipe[0].campbellsId, 'large'))
    }
    return () => {
      // window.scrollTo(0,0);
      document.body.style = null;
    }
  }, [])
//   componentWillMount: function(){
//     document.body.style.backgroundColor = "green";
// }

// componentWillUnmount: function(){
//     document.body.style.backgroundColor = null;
// }
  return (
    <div className='site-wrap'>
    {/* <Link to="/">Home</Link> */}
      {currRecipe.map(item => (
        <>
        <div key={item._id} className='recipeDetails' style={setBackground(getImage(item.image, 'large'))}>
        <h1 style={style.h1}>{item.title}</h1>
        </div>
          <div className="recipeShell" >
          {/* <header style={titleStyle(getImage(item.image, 'large'))}>asd</header> */}
          {/* <img
            src={getImage(item.image, 'large')}
            alt={decode(item.title)}
          /> */}
          {/* <header style={setBackground(getImage(item.image, 'large'))}><h1 style={style.h1}>{item.title}</h1></header> */}
            {/* <h1>{item.title}</h1> */}
            {/* <p>{item.description}</p> */}
            <div className='recipeSteps'>
            <h4 dangerouslySetInnerHTML={{__html: decode(item.description)}}></h4>
            {/* </div>
            <div className='recipeSteps'> */}
            <h3>Ingredients</h3>
            <ul>
              {item.ingredients.map(ingredient => <li key={ingredient} dangerouslySetInnerHTML={{__html: decode(ingredient)}}></li>)}
            </ul>
            {/* </div>
            <div className='recipeSteps'> */}
            <h3>Preparation</h3>
            <ul>
              {item.preparation.map(prep => <li key={prep.step} dangerouslySetInnerHTML={{__html: decode(prep.step)}}></li>)}
            </ul>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default RecipeDetail;