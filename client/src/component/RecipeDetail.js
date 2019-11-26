import React, { useEffect } from "react";
import { getImage, decode } from './utils';

const setBackground = (imageUrl) =>  {
  return {
    background: `url(${imageUrl}) center no-repeat`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    opacity: 1,
    position: 'sticky',
  }
}
const style = {
  h1: {
    fontSize: '2rem',
  }
}

function RecipeDetail(props) {
  const recipeId = props.recipeId;
  const currRecipe = props.recipes.filter(recipe => recipe._id === recipeId);

  useEffect(() => {
    window.scrollTo(0,0);
    return () => {
      document.body.style = null;
    }
  }, [])

  return (
    <div className='site-wrap'>
      {currRecipe.map(item => (
        <>
        <div key={item._id} className='recipeDetails' style={setBackground(getImage(item, 'large'))}>
        <h1 style={style.h1}>{item.title}</h1>
        </div>
          <div className="recipeShell" >
            <div className='recipeSteps'>
            <h4 dangerouslySetInnerHTML={{__html: decode(item.description)}}></h4>
            <h3>Ingredients</h3>
            <ul>
              {item.ingredients.map((ingredient,index) => <li key={index} dangerouslySetInnerHTML={{__html: decode(ingredient)}}></li>)}
            </ul>
            <h3>Preparation</h3>
            <ul>
              {item.preparation.map((prep,index) => <li key={index} dangerouslySetInnerHTML={{__html: decode(prep.step)}}></li>)}
            </ul>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default RecipeDetail;