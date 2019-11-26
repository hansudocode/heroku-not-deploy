import React, { Component, useState } from 'react';
import "../css/addRecipe.css";

function RecipeMaintenance(props) {
  const nameRef = React.createRef();
  const imageRef = React.createRef();
  const descriptionRef = React.createRef();
  const ingredientsRef = React.createRef();
  const preparationRef = React.createRef();
  const importRef = React.createRef();
  const [busy, setBusy] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const createRecipe = (e) => {
    e.preventDefault();
    setBusy(true);
    const recipe = {
      title: nameRef.current.value,
      image: imageRef.current.value,
      description: descriptionRef.current.value,
      ingredients: ingredientsRef.current.value.split(/\n/),
      preparation: preparationRef.current.value.split(/\n/).map((step) => {return {step: step}})
    };
    const {title, description, ingredients, preparation} = recipe
    if (title && description && ingredients && preparation) {
      props.addRecipe(recipe)
      props.getRecipes()
      setBusy(false)
    }
    setBusy(false)
    console.log(recipe);
  }

  // const buildRecipe = () => {
  //   const recipe = {
  //     title: nameRef.current.value,
  //     image: imageRef.current.value,
  //     description: descriptionRef.current.value,
  //     ingredients: ingredientsRef.current.value.split(/\n/),
  //     preparation: preparationRef.current.value.split(/\n/).map((step) => {return {step: step}})
  //   };
  //   const {title, description, ingredients, preparation} = recipe
  //   if (title && description && ingredients && preparation) {
  //     this.props.addRecipe(recipe);
  //   }
  // }

  const importRecipes = (e) => {
    
    const limit = parseInt(importRef.current.value > 0 ? importRef.current.value : 1);
    if (limit > 1) {
      props.importRecipes(limit);
    }
    // console.log(recipe);
  }
  
  const doAction = (action) => {
    setBusy(true);
    action.then(
      setBusy(false)
    ).then(props.getRecipes())
    .catch(setBusy(false))

  }
  
  // const enableBtn = () => busy ? 'disabled' : 'enabled';
    return (
      <div className='site-wrap'>
        <div>
          <h3>Remove All Data</h3>
          <form onSubmit={() => doAction(props.removeAll())}>
            <button type='submit' disabled={busy}>remove</button>
          </form>
        </div>
        <div>
          <h3>Import Data</h3>
          <form onSubmit={() => doAction(props.importRecipes())}>
            {/* <input
              type='text'
              name='importText'
              placeholder='Number of recipes to import'
              ref={importRef}
            /> */}
            <button type='submit' disabled={busy}>import</button>
          </form>
        </div>
        <h3>Add Recipe Form</h3>
        <form onSubmit={e => createRecipe(e)}>
          <input
            type='text'
            name='name'
            placeholder='Recipe name'
            ref={nameRef}
            disabled={busy}
          />
          <input
            type='text'
            name='image'
            placeholder='Recipe image'
            ref={imageRef} 
            disabled={busy}
          />
          <textarea
            type='text'
            name='description'
            placeholder='Description'
            ref={descriptionRef}
            disabled={busy}
          />
          <textarea
            type='text'
            name='ingredients'
            placeholder='Recipe Ingredients'
            ref={ingredientsRef}
            disabled={busy}
          />
          <textarea
            type='text'
            name='preparation'
            placeholder='Recipe preparation steps'
            ref={preparationRef}
            disabled={busy}
          />
          <button type='submit' disabled={busy}>Add Recipe</button>
        </form>
      </div>
    );
}

export default RecipeMaintenance;
