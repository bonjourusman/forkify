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

    // const data = {
    //   status: 'success',
    //   data: {
    //     recipe: {
    //       publisher: 'My Baking Addiction',
    //       ingredients: [
    //         { quantity: 1, unit: '', description: 'tbsp. canola or olive oil' },
    //         { quantity: 0.5, unit: 'cup', description: 'chopped sweet onion' },
    //         {
    //           quantity: 3,
    //           unit: 'cups',
    //           description: 'diced fresh red yellow and green bell peppers',
    //         },
    //         {
    //           quantity: 1,
    //           unit: '',
    //           description: 'tube refrigerated pizza dough',
    //         },
    //         { quantity: 0.5, unit: 'cup', description: 'salsa' },
    //         {
    //           quantity: 2,
    //           unit: 'cups',
    //           description: 'sargento chefstyle shredded pepper jack cheese',
    //         },
    //         {
    //           quantity: null,
    //           unit: '',
    //           description: 'Chopped cilantro or dried oregano',
    //         },
    //       ],
    //       source_url:
    //         'http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/',
    //       image_url:
    //         'http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg',
    //       title: 'Spicy Chicken and Pepper Jack Pizza',
    //       servings: 4,
    //       cooking_time: 45,
    //       id: '5ed6604591c37cdc054bc886',
    //     },
    //   },
    // };
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
    // console.error(`${err} 💥 💥 💥`); // Temp error handling
    throw err; // This way the promise returned by this function will get REJECTED, and not show as fulfilled.
  }
};
