const books = [];
const borrowers = new Map();
const reservations = new Map();
const categories = new Map();

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const ISBN = document.getElementById("isbn").value;
  const copies = parseInt(document.getElementById("copies").value);
  const category = "General"; // Default category

  const book = {
    title,
    author,
    ISBN,
    totalCopies: copies,
    availableCopies: copies,
    borrowers: [],
    reservedBy: [],
    category,
  };

  books.push(book);
  if (!categories.has(category)) {
    categories.set(category, []);
  }
  categories.get(category).push(ISBN);
  console.log(
    `Added "${title}" by ${author} to the library in the category ${category}.`
  );

  // Display the book as a card
  displayBookCard(book);
}

function reserveBook() {
  const ISBN = document.getElementById("reserveIsbn").value;
  const borrower = document.getElementById("reserveBorrower").value;

  const book = books.find((book) => book.ISBN === ISBN);
  if (book) {
    if (!book.borrowers.includes(borrower)) {
      if (book.reservedBy.includes(borrower)) {
        console.log(
          `${borrower} already reserved "${book.title}" by ${book.author}.`
        );
      } else {
        book.reservedBy.push(borrower);
        reservations.set(borrower, reservations.get(borrower) || []);
        reservations.get(borrower).push(ISBN);
        console.log(`${borrower} reserved "${book.title}" by ${book.author}.`);
      }
    } else {
      console.log(`${borrower} cannot reserve a book they already borrowed.`);
    }
  } else {
    console.log(`Book with ISBN ${ISBN} not found in the library.`);
  }
}

function listReservedBooks() {
  const borrower = document.getElementById("reservedBorrower").value;
  const reservedBooks = reservations.get(borrower);
  const reservedBooksList = document.getElementById("reservedBooks");
  reservedBooksList.innerHTML = "";

  if (reservedBooks) {
    reservedBooks.forEach((ISBN) => {
      const book = books.find((book) => book.ISBN === ISBN);
      const listItem = document.createElement("li");
      listItem.textContent = `- "${book.title}" by ${book.author}, ISBN: ${ISBN}`;
      reservedBooksList.appendChild(listItem);
    });
  } else {
    console.log(`${borrower} has no reserved books.`);
  }
}

function displayBookCard(book) {
  const libraryBooks = document.getElementById("libraryBooks");
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `<strong>Title:</strong> ${book.title}<br>
                <strong>Author:</strong> ${book.author}<br>
                <strong>ISBN:</strong> ${book.ISBN}`;
  libraryBooks.appendChild(bookCard);
}

function borrowBook() {
  const ISBN = document.getElementById("borrowIsbn").value;
  const borrower = document.getElementById("borrowerName").value;

  const book = books.find((book) => book.ISBN === ISBN);
  if (book) {
    if (!book.availableCopies) {
      console.log(
        `All copies of "${book.title}" by ${book.author} are currently borrowed.`
      );
    } else {
      book.availableCopies--;
      book.borrowers.push(borrower);
      console.log(`${borrower} borrowed "${book.title}" by ${book.author}.`);
    }
  } else {
    console.log(`Book with ISBN ${ISBN} not found in the library.`);
  }
}

function returnBook() {
  const ISBN = document.getElementById("returnIsbn").value;
  const borrower = document.getElementById("returnBorrower").value;

  const book = books.find((book) => book.ISBN === ISBN);
  if (book) {
    if (book.borrowers.includes(borrower)) {
      book.availableCopies++;
      book.borrowers = book.borrowers.filter((name) => name !== borrower);
      console.log(`${borrower} returned "${book.title}" by ${book.author}.`);
    } else {
      console.log(
        `${borrower} did not borrow "${book.title}" by ${book.author}.`
      );
    }
  } else {
    console.log(`Book with ISBN ${ISBN} not found in the library.`);
  }
}
