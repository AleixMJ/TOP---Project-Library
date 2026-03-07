/* Declare constants*/

const myLibrary = [];
const addBookTab = document.querySelector("#addBookTab");
const content = document.querySelector(".content");
let formVisible = false;
const form = document.createElement("form");
const libraryDisplay = document.querySelector(".library-display");
const LibraryTab = document.querySelector("#LibraryTab");

/* Displaying the books on the Library */


LibraryTab.addEventListener("click", () => {
    if (formVisible = true) {
        form.reset();
        form.remove();
        formVisible = false;
    }
    libraryDisplay.hidden = false;
    for (let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read}</p>
        `;
        libraryDisplay.appendChild(bookCard);
    }
});


/* Adding book form display and processing process */


addBookTab.addEventListener("click", () => {
    if (formVisible) return;    
    form.className = "book-form";
    form.innerHTML = `
        <h2>Add New Book</h2>
        
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required placeholder="e.g. The Hobbit">
        </div>

        <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" required placeholder="e.g. J.R.R. Tolkien">
        </div>

        <div class="form-group">
            <label for="pages">Number of Pages:</label>
            <input type="number" id="pages" name="pages" min="1" required placeholder="e.g. 310">
        </div>

        <div class="form-group radio-group">
            <label>Have you read it?</label>
            <label>
                <input type="radio" name="read" value="yes" required> Yes
            </label>
            <label>
                <input type="radio" name="read" value="no"> No
            </label>
        </div>

        <div class="form-buttons">
            <button type="submit">Add Book</button>
        </div>
    `;
    libraryDisplay.hidden = true;
    content.appendChild(form);
    formVisible = true;
    form.addEventListener('submit', handleSubmit);


    
});




function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    addBookToLibrary(data.title, data.author, data.pages, data.read);
    form.reset();
    form.remove();
    formVisible = false;
    alert("Book added to the Library");

}

function Book(title, author, pages, read) {

    let readYet = read.toLowerCase();
    if (read != "yes" && read != "no") {
        throw Error("the parameter read can only be 'yes' or no")
    }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = readYet;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
    
}
