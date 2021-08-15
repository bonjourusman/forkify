import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

/////////////////////////////////////////////////////////////////
// Load a Recipe from API
/////////////////////////////////////////////////////////////////

// Jonas' API - Review documentation:
// URL https://forkify-api.herokuapp.com/v2

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`); // as getJSON() is an async function, it will return a promise. Thus, we need to add 'await'

    // console.log(data);
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

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    // console.log(state.search.results);
  } catch (err) {
    // console.error(`${err} 💥 💥 💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (pageNum = state.search.page) {
  state.search.page = pageNum;

  const start = (pageNum - 1) * state.search.resultsPerPage;
  const end = pageNum * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // Change quantity in each ingredient
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // Update Servings in the state
  state.recipe.servings = newServings;
};
