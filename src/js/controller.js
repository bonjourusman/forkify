import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// IMPORTANT
// Add Polyfills for ES6 features via command line:
// npm i core-js regenerator-runtime // install
import 'core-js/stable';
import 'regenerator-runtime';

const controlRecipes = async function () {
  // using async function for non-blocking code execution
  try {
    // 1. GET RECIPE ID
    const id = window.location.hash;
    if (!id) return; // guard clause

    // 1. LOAD RECIPE
    recipeView.renderSpinner();
    await model.loadRecipe(id.slice(1)); // as loadRecipe() is an async function, it will return a promise. Thus, we need to add 'await'
    console.log(model.state.recipe);

    // 2. RENDER RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);

    // 1. GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    // 2. LOAD SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3. RENDER SEARCH RESULTS
    // console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};
// controlSearchResults();

/////////////////////////////////////////////////////////////////
// Event Listeners
/////////////////////////////////////////////////////////////////

// Use the Publisher-Subscriber pattern as shown in Slide 249 in Theory Lectures PDF

// Subscriber
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

//

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

//

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

//

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

//

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

//
