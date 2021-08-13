// import local images as parcel will change file names when transpiling the code and our links in the code below will break
// import icons from "../img/icons.svg"; // Parcel v.1
import icons from 'url:../img/icons.svg'; // Parcel v.2
// console.log(icons); // This will be the modified link created by parcel

// IMPORTANT
// Add Polyfills for ES6 features via command line:
// npm i core-js regenerator-runtime

import 'core-js/stable';
import 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/////////////////////////////////////////////////////////////////
// Loading a Recipe from API
/////////////////////////////////////////////////////////////////

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
          <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div>
        `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

// Jonas' API - Review documentation:
// URL https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
  // using async function for non-blocking code execution
  try {
    //////////////////////////////////////////////
    // 1. LOAD RECIPE
    //////////////////////////////////////////////
    renderSpinner(recipeContainer);

    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    ); // returns a promise
    const data = await res.json(); // returns a promise

    // console.log(res, data);

    let { recipe } = data.data;

    recipe = {
      // Rename Properties to get rid of underscores
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    //////////////////////////////////////////////
    // 2. RENDER RECIPE
    //////////////////////////////////////////////

    const markup = `
        <figure class="recipe__fig">
              <img src="${recipe.image}" alt=${
      recipe.title
    } class="recipe__img" crossorigin/>
              <h1 class="recipe__title">
                <span>${recipe.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">4</span>
                <span class="recipe__info-text">${recipe.servings}</span>

                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--increase-servings">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round">
                <svg class="">
                  <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
              
                ${recipe.ingredients
                  .map((ing) => {
                    return `
                        <li class="recipe__ingredient">
                        <svg class="recipe__icon">
                          <use href="src/img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${ing.quantity}</div>
                        <div class="recipe__description">
                          <span class="recipe__unit">${ing.unit}</span>
                          ${ing.description}
                        </div>
                      </li>
                      `;
                  })
                  .join('')}
              </div>
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  recipe.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${recipe.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
        `;
    // Clear Default Text
    recipeContainer.innerHTML = '';

    // Insert HTML to DOM (add to parent element class: recipe)
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    console.error(err.message);
  }
};
showRecipe();

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

/////////////////////////////////////////////////////////////////
//
/////////////////////////////////////////////////////////////////

//
