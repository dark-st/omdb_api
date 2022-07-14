let moviesList = null;
let triggerMode = false;
let inputSearch = null;

const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
  evt = null,
  handler = null,
}) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);
  if (evt && handler && typeof handler === 'function')
    el.addEventListener(evt, handler);
  return el;
};

const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `
                * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
        }

        .container {
          padding: 20px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .movies {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .movie {
          display: flex;
          align-content: center;
          justify-content: center;
        }

        .movie__img {
          width: 100%;
          object-fit: cover;
        }

        .search {
          margin-bottom: 30px;
        }
        .search__label-input {
          display: block;
          margin-bottom: 7px;
        }

        .search__input {
          display: block;
          width: 400px;
          padding: 10px 15px;
          margin-bottom: 10px;
          border-radius: 4px;
          border: 1px solid lightgray;
        }

        .search__label-checkbox {
          font-size: 12px;
          display: inline-block;
          transform: translate(7px, -1.75px);
        }
          
        `,
    },
    container: document.head,
  });
};

const createMarkUp = () => {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend',
  });

  createElement({
    type: 'h1',
    attrs: { innerHTML: 'Film search app' },
    container,
  });

  const searchBox = createElement({
    type: 'div',
    attrs: { class: 'search' },
    container,
  });

  const inputBox = createElement({
    type: 'div',
    attrs: { class: 'search__group search__group--input' },
    container: searchBox,
  });

  const CheckBox = createElement({
    type: 'div',
    attrs: { class: 'search__group search__group--checkbox' },
    container: searchBox,
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'search',
      innerHTML: 'Film search',
      class: 'search__label-input',
    },
    container: inputBox,
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      id: 'search',
      type: 'text',
      placeholder: 'Enter film name',
      class: 'search__input',
    },
    container: inputBox,
  });

  createElement({
    type: 'input',
    attrs: {
      id: 'checkbox',
      type: 'checkbox',
      class: 'search__checkbox',
    },
    container: CheckBox,
    evt: 'click',
    handler: () => (triggerMode = !triggerMode),
  });

  createElement({
    type: 'label',
    attrs: {
      for: 'checkbox',
      innerHTML: 'Add films to created list',
      class: 'search__label-checkbox',
    },
    container: CheckBox,
  });

  moviesList = createElement({
    type: 'div',
    attrs: { class: 'movies' },
    container,
  });
};

const AddMovieToList = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: { class: 'movie' },
    container: moviesList,
  });

  createElement({
    type: 'img',
    attrs: {
      class: 'movie__img',
      src: /^(http||https):\/\//i.test(movie.Poster)
        ? movie.Poster
        : 'assets/img/no-image.jpg',
      alt: movie.Title,
      title: movie.Title,
    },
    container: item,
  });
};

const clearMoviesMarkUp = (el) => el && (el.innerHTML = '');
export {
  moviesList,
  triggerMode,
  inputSearch,
  createStyle,
  createMarkUp,
  AddMovieToList,
  clearMoviesMarkUp,
};
