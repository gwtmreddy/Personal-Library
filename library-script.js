const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    if (this.isRead === true) {
      return `${this.title} by ${this.author}, read`;
    } else {
      return `${this.title} by ${this.author}, not yet read`;
    }
  };
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead); // Create a new Book object
  myLibrary.push(newBook); // Add the new book to the library array
  renderLibrary();
}

const addBook = document.getElementById("add-book");
const modal = document.getElementById("modal");
const store = document.getElementById("store-book");
const closeModal = document.getElementById("close-modal");

//open modal
addBook.addEventListener("click", () => {
  modal.style.display = "block";
});

//close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

function renderLibrary() {
  const bookcard = document.getElementById("bookcard"); // Get the bookcard div
  bookcard.innerHTML = ""; // Clear existing content

  myLibrary.forEach((book, index) => {
    // Create a card for each book
    const card = document.createElement("div");
    card.classList.add("book-card"); // Add styling class
    card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? "Read" : "Not Read Yet"}</p>
            <button class="remove-book" data-index="${index}">Remove</button>
        `;

    bookcard.appendChild(card); // Add card to the bookcard div
  });

  // Add event listeners for remove buttons
  const removeButtons = document.querySelectorAll(".remove-book");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index; // Get the book's index
      myLibrary.splice(index, 1); // Remove the book from the array
      renderLibrary(); // Re-render the library
    });
  });
}

store.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  // Clear the form and close the modal
  document.getElementById("title").value = "";
  document.getElementById("author").value = ""; // Same typo as above
  document.getElementById("pages").value = "";
  document.getElementById("isRead").checked = false;
  modal.style.display = "none";
});

console.log(myLibrary);
