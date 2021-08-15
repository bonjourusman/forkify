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
    this._clear(); // clear default text from parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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

  render(data) {
    // Return an Error if data is undefined (no data) or if data array is empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear(); // clear spinner from parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // Insert HTML to DOM (add to parent element class: recipe)
  }
}
