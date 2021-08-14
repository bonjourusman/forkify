// import local images because parcel will change file names when transpiling the code and our local directory file links in the code below will break
// import icons from "../img/icons.svg"; // Parcel v.1
import icons from 'url:../../img/icons.svg'; // Parcel v.2
// console.log(icons); // This will be the modified link created by parcel

// Reformat decimals to fractions
import { Fraction } from 'fractional';
// Documentation URL: www.npmjs.com/package/fractional

// Creating a class for this view so later we can have a parent class called View which will have a few methods that all its children will inherit.
class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = 'We could not find that recipe. Please try another one!';

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
          `;
    this.#clear(); // clear default text from parent element
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear(); // clear spinner from parent element
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); // Insert HTML to DOM (add to parent element class: recipe)
  }

  #generateMarkup() {
    return `
        <figure class="recipe__fig">
            <img src="${this.#data.image}" alt=${
      this.#data.title
    } class="recipe__img" crossorigin/>
            <h1 class="recipe__title">
            <span>${this.#data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
        </div>
        
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">4</span>
            <span class="recipe__info-text">${this.#data.servings}</span>

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
            ${this.#data.ingredients
              .map(this.#generateMarkupIngredient)
              .join('')}
        </div>
        
        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
            </p>
            <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
            >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>
        `;
  }

  #generateMarkupIngredient(ing) {
    return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </div>
        </li>
            `;
  }

  // This is a Publisher (function) that receives a Subscriber (function) as its input argument; we are adding a handler function to render the recipe.
  addHandlerRender(handler) {
    // Change of Hash ID in the url & New page load events
    ['hashchange', 'load'].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }
}

export default new RecipeView(); // not passing any data to this class, so construction function is not required.

/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
