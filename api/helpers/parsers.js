const { decode } = require('./utils');

const parseRecipe = (recipe) => {
  const {Id: id, Name: title, Description: description, Ingredients, RecipeSteps, RecipeMetaRecords} = recipe;
  const preparation = parseSteps(RecipeSteps);
  const ingredients = parseIngredients(Ingredients);
  // const image = `https://www.cscassets.com/recipes/square_cknew/square_${id}.jpg`;
  const image = id;
  return {
    // id: parseInt(id),
    title: decode(title),
    campbellsId: parseInt(id),
    description: decode(description),
    image: image,
    ingredients: ingredients,
    preparation: preparation,
  }
}

const parseSteps = (recipeSteps) => {
  return recipeSteps
    .sort((a, b) => (a.Order > b.Order) ? 1 : -1)
    .map(step => {return {step: decode(step.Description)}})
}

const parseIngredients = (ingredients) => {
  return ingredients
    .sort((a, b) => (a.Id > b.Id) ? 1 : -1)
    .map(({ExternalProduct: externalProduct, DescriptionFormatter: desc}) => {
      return decode(externalProduct ? 
        desc.replace(/{product}/gi, externalProduct.Name || 'unknown')
        : desc)
    })
}

exports.parseRecipe = parseRecipe;
exports.parseSteps = parseSteps;
exports.parseIngredients = parseIngredients;