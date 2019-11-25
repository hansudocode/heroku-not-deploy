import React from 'react';
import Recipe from './Recipe';

class Recipes extends React.Component {
  render() {
    const { recipes, removeRecipe } = this.props;
    console.log(recipes);
    return (
      <div  className="site-wrap">
        {recipes.map((recipe, index) => (
          <Recipe key={recipe._id} recipe={recipe} index={index} removeRecipe={removeRecipe}/>
        ))}
      </div>
    );
  }
}

export default Recipes;