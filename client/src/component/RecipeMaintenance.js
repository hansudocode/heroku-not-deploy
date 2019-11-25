import React, { Component } from 'react';
import "../css/addRecipe.css";


class RecipeMaintenance extends Component {
  nameRef = React.createRef();
  imageRef = React.createRef();
  descriptionRef = React.createRef();
  ingredientsRef = React.createRef();
  preparationRef = React.createRef();
  importRef = React.createRef();

  createRecipe(e) {
    e.preventDefault();
    const recipe = {
      title: this.nameRef.current.value,
      image: this.imageRef.current.value,
      description: this.descriptionRef.current.value,
      ingredients: this.ingredientsRef.current.value.split(/\n/),
      preparation: this.preparationRef.current.value.split(/\n/).map((step) => {return {step: step}})
    };
    const {title, description, ingredients, preparation} = recipe
    if (title && description && ingredients && preparation) {
      this.props.addRecipe(recipe);
    }
    console.log(recipe);
  }

  importRecipe(e) {
    e.preventDefault();
    const limit = parseInt(this.importRef.current.value > 0 ? this.importRef.current.value : 1);
    if (limit > 1) {
      this.props.importRecipes(limit);
    }
    // console.log(recipe);
  }
  
  render() {
    return (
      <div className='site-wrap'>
        <div>
          <h3>Remove All Data</h3>
          <form onSubmit={() => this.props.removeAll()}>
            <button type='submit'>remove</button>
          </form>
        </div>
        <div>
          <h3>Import Data</h3>
          <form onSubmit={() => this.props.importRecipes()}>
            {/* <input
              type='text'
              name='importText'
              placeholder='Number of recipes to import'
              ref={this.importRef}
            /> */}
            <button type='submit'>import</button>
          </form>
        </div>
        <h3>Add Recipe Form</h3>
        <form onSubmit={e => this.createRecipe(e)}>
          <input
            type='text'
            name='name'
            placeholder='Recipe name'
            ref={this.nameRef}
          />
          <input
            type='text'
            name='image'
            placeholder='Recipe image'
            ref={this.imageRef} 
          />
          <textarea
            type='text'
            name='description'
            placeholder='Description'
            ref={this.descriptionRef}
          />
          <textarea
            type='text'
            name='ingredients'
            placeholder='Recipe Ingredients'
            ref={this.ingredientsRef}
          />
          <textarea
            type='text'
            name='preparation'
            placeholder='Recipe preparation steps'
            ref={this.preparationRef}
          />
          <button type='submit'>Add Recipe</button>
        </form>
      </div>
    );
  }
}

export default RecipeMaintenance;
