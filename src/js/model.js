import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

/////////////////////////////////////////////////////////////////
// Load a Recipe from API
/////////////////////////////////////////////////////////////////

// Jonas' API - Review documentation:
// URL https://forkify-api.herokuapp.com/v2

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`); // as getJSON() is an async function, it will return a promise. Thus, we need to add 'await'
    console.log(data);
    const { recipe } = data.data;

    state.recipe = {
      // Rename Properties to get rid of underscores and add them to the state object
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥 💥 💥`);
  }
};
