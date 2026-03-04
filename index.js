const myLibrary = [];


const addBookTab = document.querySelector("#addBookTab");
const content = document.querySelector(".content");

let formVisible = false;

addBookTab.addEventListener("click", () => {
    if (formVisible) return;

    const form = document.createElement("form");
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
            <button type="button" class="cancel-btn">Cancel</button>
        </div>
    `;

    content.appendChild(form);
    formVisible = true;
});



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
