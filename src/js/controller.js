import * as model from './model.js';
import recipeView from './views/recipeView.js';

// IMPORTANT
// Add Polyfills for ES6 features via command line:
// npm i core-js regenerator-runtime // install
import 'core-js/stable';
import 'regenerator-runtime';

const controlRecipes = async function () {
  // using async function for non-blocking code execution
  try {
    const id = window.location.hash;

    if (!id) return; // guard clause
    recipeView.renderSpinner();

    // 1. LOAD RECIPE
    await model.loadRecipe(id); // as loadRecipe() is an async function, it will return a promise. Thus, we need to add 'await'

    // 2. RENDER RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err.message);
  }
};
// controlRecipes();

/////////////////////////////////////////////////////////////////
// Event Listeners
/////////////////////////////////////////////////////////////////

// Change of Hash ID in the url & New page load events
['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);

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
