import View from './View.js';

// Child class of View. Also, a child class of resultsView and bookmarksView containing a common method.
class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    // Keep result/bookmark item highlighted by adding an active class if it has been clicked.
    const id = window.location.hash.slice(1); // id shown in url

    return `
        <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
                <figure class="preview__fig">
                    <img src="${this._data.image}" alt="${
      this._data.title
    }" crossorigin/>
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${this._data.title}</h4>
                    <p class="preview__publisher">${this._data.publisher}</p>
                </div>
            </a>
        </li>`;
  }
}

export default new PreviewView();
