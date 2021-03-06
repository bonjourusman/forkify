import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// IMPORTANT
// Add Polyfills for ES6 features via command line:
// npm i core-js regenerator-runtime // install
import 'core-js/stable';
import 'regenerator-runtime';

// Prevent webpage from reloading (Parcel's feature)
// if (module.hot) {
//   module.hot.accept();
// }

// Following functions are Controllers or Handlers that will be attached to Event Listeners

const controlRecipes = async function () {
  // using async function for non-blocking code execution
  try {
    // 1. GET RECIPE ID
    const id = window.location.hash;
    if (!id) return; // guard clause

    // 2. UPDATE RESULTS and BOOKMARK VIEWS to highlight selected Search Result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 3. LOAD RECIPE
    recipeView.renderSpinner();
    await model.loadRecipe(id.slice(1)); // as loadRecipe() is an async function, it will return a promise. Thus, we need to add 'await'
    // console.log(model.state.recipe);

    // 4. RENDER RECIPE
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

    // 3. RENDER INITIAL SEARCH RESULTS (1st Page)
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4. RENDER INITIAL PAGINATION BUTTONS (1st Page)
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
// controlSearchResults();

// This function will execute after we have the data already loaded, so async isn't required.
const controlPagination = function (goToPage) {
  // console.log(goToPage);

  // 1. RENDER NEW RESULTS (based on Page Button Clicks)
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. RENDER NEW PAGINATION BUTTONS (based on Page Button Clicks)
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1. UPDATE RECIPE SERVINGS (in state)
  model.updateServings(newServings);

  // 2. UPDATE RECIPE VIEW
  // recipeView.render(model.state.recipe); // This results in flickering because with each change in servings, the image is reloaded. Thus, rendering the entire view (all html elements) is not efficient. Use an update method instead:
  recipeView.update(model.state.recipe); // only update changed text and attributes in DOM without re-rendering the whole view.
};

const controlAddBookmark = function () {
  // 1. Add or Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. UPDATE RECIPE VIEW
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // 3. RENDER BOOKMARKS
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    // Show Loading Spinner
    addRecipeView.renderSpinner();

    // 1. UPLOAD RECIPE DATA
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    // 2. RENDER RECIPE
    recipeView.render(model.state.recipe);

    // 3. SUCCESS MESSAGE
    addRecipeView.renderMessage();

    // 4. RENDER BOOKMARK VIEW
    bookmarksView.render(model.state.bookmarks);

    // 5. Change ID in the url through History API
    window.history.pushState(null, '', `#${model.state.recipe.id}`); // change url without reloading the page
    // window.history.back() // method to go back to last page. FYI.

    // 5. CLOSE FORM WINDOW
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('????', err);
    addRecipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log('Welcome to Forkify!');
};
/////////////////////////////////////////////////////////////////
// Event Listeners
/////////////////////////////////////////////////////////////////

// Use the Publisher-Subscriber pattern as shown in Slide 249 in Theory Lectures PDF

// Subscriber
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
