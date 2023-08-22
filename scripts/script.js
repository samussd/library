/*TODO: 
validate form input
styling
change delete icon to trashcan
pressed button when read, unpressed when not, maybe add check

EXTRA:
sort by insertion date, title, author, year (copy with splice, then sort)
double click to delete
edit book
*/

const bookContainer = document.querySelector('.book-container');
const addBtn = document.querySelector('.utility__add-btn');
const dialog = document.querySelector('.dialog');
const dialogForm = document.querySelector('.dialog__form');
const submitBtn = document.querySelector('.dialog__submit-btn');

const library = []

function Book(title, author, year, pages, read) {
  this.author = author;
  this.title = title;
  this.year = year;
  this.pages = pages;
  this.read = read;

  this.toggleReadStatus = function () {
    this.read = !this.read;
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
  yearElem.textContent = `published ${year}`;

  const pagesElem = document.createElement('p');
  pagesElem.classList.add('book__pages');
  pagesElem.textContent = `${pages} pages`;

  const readButton = document.createElement('button');
  readButton.classList.add('book__read-btn');
  readButton.setAttribute('type', 'button');
  readButton.textContent = isRead ? 'READ' : 'NOT READ';

  const removeButton = document.createElement('button');
  removeButton.classList.add('book__remove-btn');
  removeButton.setAttribute('type', 'button');
  removeButton.textContent = 'X';

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
    btn.textContent = bookObj.read ? 'READ' : 'NOT READ';
  })

  removeButton.addEventListener("click", (e) => {
    const bookElement = e.target.parentNode;
    removeBook(bookElement);
  })
}

function removeBook(book) {
  const bookInd = library.findIndex(b => 
    b.title === book.dataset.title &&
    b.author === book.dataset.author);
  library.splice(bookInd, 1);
  book.remove();
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

dialog.addEventListener("close", () => {
  const bookName = document.getElementById('book-name-input').value;
  const author = document.getElementById('author-input').value;
  const year = document.getElementById('year-input').value;
  const pages = document.getElementById('pages-input').value;
  const isRead = document.getElementById('read-checkbox').checked;

  dialogForm.reset();

  createdBook = addBookToLibrary(bookName, author, year, pages, isRead);
  addBookToContainer(createdBook);
});


createdBook = addBookToLibrary("1984", "George Orwell", "1949", "200", true);
addBookToContainer(createdBook);
