const bookContainer = document.querySelector('.book-container');
const addBtn = document.querySelector('.utility__add-btn');
const dialog = document.querySelector('.dialog');
const dialogForm = document.querySelector('.dialog__form');
const submitBtn = document.querySelector('.dialog__submit-btn');

const library = [];

class Book {
  constructor(title, author, year, pages, read) {
    this._title = title;
    this._author = author;
    this._year = year;
    this._pages = pages;
    this._read = read;
  }

  get title() { return this._title; }
  get author() { return this._author; }
  get year() { return this._year; }
  get pages() { return this._pages; }
  get read() { return this._read; }

  toggleReadStatus() {
    this._read = !this._read;
  }
}


function addBookToLibrary(title, author, year, pages, read) {
  const book = new Book(title, author, year, pages, read);
  library.push(book);
  return book;
}

function addBookToContainer(book) {
  const title = book.title;
  const author = book.author;
  const year = book.year;
  const pages = book.pages;
  const isRead = book.read;

  const bookElement = document.createElement('div');
  bookElement.classList.add('book');
  bookElement.setAttribute('data-title', title);
  bookElement.setAttribute('data-author', author);
  bookElement.setAttribute('data-year', year);
  bookElement.setAttribute('data-pages', pages);
  bookElement.setAttribute('data-read', isRead);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('book__title');
  titleElement.textContent = title;

  const authorElement = document.createElement('h3');
  authorElement.classList.add('book__author');
  authorElement.textContent = author;

  const yearElem = document.createElement('p');
  yearElem.classList.add('book__year');
  yearElem.textContent = year==='' ? '' : `published on ${year}`;

  const pagesElem = document.createElement('p');
  pagesElem.classList.add('book__pages');
  pagesElem.textContent = pages==='' ? '' : `${pages} pages`;

  const readButton = document.createElement('button');
  readButton.classList.add('book__read-btn');
  readButton.setAttribute('type', 'button');
  readButton.textContent = isRead ? 'READ' : 'NOT READ';
  if (isRead) bookElement.classList.add('book--read');

  const removeButton = document.createElement('button');
  removeButton.classList.add('book__remove-btn');
  removeButton.setAttribute('type', 'button');

  bookElement.appendChild(titleElement);
  bookElement.appendChild(authorElement);
  bookElement.appendChild(yearElem);
  bookElement.appendChild(pagesElem);
  bookElement.appendChild(readButton);
  bookElement.appendChild(removeButton);

  bookContainer.appendChild(bookElement);

  readButton.addEventListener("click", (e) => {
    const btn = e.target;
    const book = e.target.parentNode;
    bookObj = library.find(b =>
      b.title === book.dataset.title &&
      b.author === book.dataset.author);

    bookObj.toggleReadStatus();
    book.classList.toggle("book--read");
    btn.textContent = bookObj.read ? 'READ' : 'NOT READ';
  });

  removeButton.addEventListener("click", (e) => {
    const bookElement = e.target.parentNode;
    removeBook(bookElement);
  });
}

function removeBook(book) {
  const bookInd = library.findIndex(b =>
    b.title === book.dataset.title &&
    b.author === book.dataset.author);
  library.splice(bookInd, 1);
  book.remove();
}

function validateForm() {
  const bookNameInput = document.getElementById('book-name-input');
  const authorInput = document.getElementById('author-input');

  const bookName = bookNameInput.value.trim();
  const author = authorInput.value.trim();
  
  if (bookName !== '') bookNameInput.validity.valid = true;
  else {
    bookNameInput.validity.valid = false;
    return false;
  }

  if (author !== '') authorInput.validity.valid = true;
  else {
    authorInput.validity.valid = false;
    return false;
  }

  return true;
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  const bookNameInput = document.getElementById('book-name-input');
  const authorInput = document.getElementById('author-input');
  const yearInput = document.getElementById('year-input');
  const pagesInput = document.getElementById('pages-input');

  const bookName = bookNameInput.value.trim();
  const author = authorInput.value.trim();
  const year = yearInput.value.trim();
  const pages = pagesInput.value.trim();
  const isRead = document.getElementById('read-checkbox').checked;

  createdBook = addBookToLibrary(bookName, author, year, pages, isRead);
  addBookToContainer(createdBook);

  dialog.close();

});


dialog.addEventListener("close", () => {
  dialogForm.reset();
});


createdBook = addBookToLibrary("1984", "George Orwell", "1949", "328", false);
addBookToContainer(createdBook);
