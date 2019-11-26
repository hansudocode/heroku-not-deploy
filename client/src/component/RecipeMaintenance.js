import React, { useState } from 'react';
import "../css/addRecipe.css";

function RecipeMaintenance(props) {
  const nameRef = React.createRef();
  const imageRef = React.createRef();
  const descriptionRef = React.createRef();
  const ingredientsRef = React.createRef();
  const preparationRef = React.createRef();
  const [busy, setBusy] = useState(false);

  const createRecipe = (e) => {
    if (e.keyCode === '13') {
      e.preventDefault();
    } else {
      const recipe = {
        title: nameRef.current.value,
        image: imageRef.current.value,
        description: descriptionRef.current.value,
        ingredients: ingredientsRef.current.value.split(/\n/),
        preparation: preparationRef.current.value.split(/\n/).map((step) => {return {step: step}})
      };
      const {title, description, ingredients, preparation} = recipe
      if (title.length > 0 && description.length > 0 && ingredients.length > 0 && preparation.length > 0) {
        console.log('recipe', recipe)
        setBusy(true);
        props.addRecipe(recipe)
        setBusy(false)
      }
      console.log(recipe);
    }
  }
  
  const doAction = (action) => {
    setBusy(true);
    action.then(
      setBusy(false)
    ).then(props.getRecipes())
    .catch(setBusy(false))

  }
  
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
