import View from './View.js';
import previewView from './previewView.js';

// Child Class of View
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet! Find a nice repice and bookmark it.';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
