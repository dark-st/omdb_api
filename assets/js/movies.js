import {
  moviesList,
  triggerMode,
  inputSearch,
  createMarkUp,
  createStyle,
  AddMovieToList,
  clearMoviesMarkUp,
} from './dom.js';

const search = 'mov';
let searchLast = null;
let siteUrl = null;

const debounce = (() => {
  let timer = null;

  return (cb, ms) => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(cb, ms);
  };
})();

const inputSearchHandler = (e) => {
  debounce(() => {
    const searchString = e.target.value.trim();
    if (
      searchString &&
      searchString !== searchLast &&
      searchString.length > 3
    ) {
      if (!triggerMode) clearMoviesMarkUp(moviesList);
      getData(`${siteUrl}/?apikey=7eef242b&s=${searchString}`)
        .then((movies) => movies.forEach((movie) => AddMovieToList(movie)))
        .catch((err) => console.log(err));
    }
    searchLast = searchString;
  }, 2000);
};

const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (!json || !json.Search) throw Error('Incorrect object');

      return json.Search;
    });

export const appInit = (url) => {
  siteUrl = url || 'https://www.omdbapi.com';
  createMarkUp();
  createStyle();
  inputSearch.addEventListener('keyup', inputSearchHandler);
};
