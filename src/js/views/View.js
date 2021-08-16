// import local images because parcel will change file names when transpiling the code and our local directory file links in the code below will break
// import icons from "../img/icons.svg"; // Parcel v.1
import icons from 'url:../../img/icons.svg'; // Parcel v.2
// console.log(icons); // This will be the modified link created by parcel

// We will export the parent class itself, and NOT the instance or object created from this class

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
          `;
    this._clear(); // clear default or prior content from parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /** DOCUMENTATION EXAMPLE: Refer to www.JSDOC.app for more info
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render is false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    // Return an Error if data is undefined (no data) or if data array is empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear(); // clear spinner or prior content from parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert HTML to DOM (add to parent element class: e.g. recipe)
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Convert markup string to a DOM object so it can be later used for comparison
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // select all elements in the new DOM and place them in an array

    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // select all elements in the old DOM and place them in an array

    // Compare the two set of elements to find the differences
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT if the nodes are same AND if their firstChild's nodeValue is not empty (i.e. some text content exists) - Use optional chaining to account for cases when the firstChild might not exist.
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES if the new element is different from the old one
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
