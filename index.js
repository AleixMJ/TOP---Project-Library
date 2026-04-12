/* Declare constants*/

let myLibrary = [];
const addBookTab = document.querySelector("#addBookTab");
const content = document.querySelector(".content");
let formVisible = false;
const form = document.createElement("form");
form.noValidate = true;
const libraryDisplay = document.querySelector(".library-display");
const LibraryTab = document.querySelector("#LibraryTab");

/* Displaying the books on the Library */


LibraryTab.addEventListener("click", () => createLibrary());


/* Adding book form display and processing process */


addBookTab.addEventListener("click", () => {
    if (formVisible) return;    
    form.className = "book-form";
    form.innerHTML = `
        <h2>ADD NEW BOOK</h2>
        
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
            <input type="number" id="pages" name="pages" required placeholder="e.g. 310">
        </div>

        <div class="form-group radio-group">
            <label>Have you read it?</label>
            <label>
                <input type="radio" name="read" value="yes" required> Yes
            </label>
            <label>
                <input type="radio" name="read" value="no" checked> No
            </label>
        </div>

        <div class="form-buttons">
            <button type="submit">Add Book</button>
        </div>
    `;
    libraryDisplay.innerHTML = "";
    libraryDisplay.hidden = true;
    content.appendChild(form);
    formVisible = true;
    form.addEventListener('submit', handleSubmit);


    
});


function createLibrary() {
    console.log("creating Library");
    if (formVisible == true) {
        form.reset();
        form.remove();
        formVisible = false;
    }
    libraryDisplay.innerHTML = "";
    libraryDisplay.hidden = false;
    const BookCardTitles = document.createElement("div");
    BookCardTitles.className = "book-card";
    BookCardTitles.innerHTML = ` <div> Title </div>
    <div> Author </div>
    <div> Pages </div>
    <div> Read </div>
    <div> Delete </div>
    `
    libraryDisplay.appendChild(BookCardTitles);
    for (let book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `<div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-pages">${book.pages} pages</div>
        <div class="book-read"> <button class="read-button" data-id="${book.id}"
         data-read="${book.read}"></button> </div>
        <button class="delete-button" data-id="${book.id}"></button>
        `;
        const readBtn = bookCard.querySelector(".read-button");
        readBtn.addEventListener("click", () => {
            book.toggleRead();
            createLibrary();
        })
        const deleteBtn = bookCard.querySelector(".delete-button");
        deleteBtn.addEventListener("click", () => {
        const bookId = deleteBtn.dataset.id;
        myLibrary = myLibrary.filter(book => book.id != bookId);
        createLibrary();  
        })
        libraryDisplay.appendChild(bookCard);
    }

}



function handleSubmit(event) {
    event.preventDefault();

    // check custom validity
    const authorInput = form.querySelector("#author");
    const titleInput = form.querySelector("#title");
    const pagesInput = form.querySelector("#pages");

    authorInput.setCustomValidity("");
    titleInput.setCustomValidity("");
    pagesInput.setCustomValidity("");
    let isValid = true;

    if (authorInput.value.trim() === "") {
        authorInput.setCustomValidity(`The author name must be filled!`);
        isValid = false;
        

    }

        if (titleInput.value.trim() === "") {
        titleInput.setCustomValidity(`The title must be filled!`);
        isValid = false;     

    }

    if (pagesInput.value.trim() === "") {
        pagesInput.setCustomValidity(`The number of pages must be filled!`);
        isValid = false;
    }

    if (!isValid) {
        form.reportValidity();
        return;
    }

    // add book
    const submittedform = event.target;
    const formData = new FormData(submittedform);
    const data = Object.fromEntries(formData);
    addBookToLibrary(data.title, data.author, data.pages, data.read);
    submittedform.reset();
    submittedform.remove();
    formVisible = false;
    alert("Book added to the Library");

}

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        let readYet = read.toLowerCase();
        if (read != "yes" && read != "no") {
            throw Error("the parameter read can only be 'yes' or no")
        }
        this.read = readYet;
        this.id = crypto.randomUUID();
    }
    

        
    toggleRead() {
        this.read = (this.read == "yes") ? "no" : "yes";
    }
}


function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
    
}
