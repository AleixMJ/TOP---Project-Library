const myLibrary = [];

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
