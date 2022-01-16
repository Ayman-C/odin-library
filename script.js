function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read ? "read" : "not read yet";
}
Book.prototype.info=function() {
    return `This book is by ${this.author}, ${this.pages} pages, ${this.read}`;
}
Book.prototype.toggleRead=function() {
    return this.read=!this.read;
}

//let myLibrary= [];
const sample1= new Book("To Kill a Mockingbird","Harper Lee","281",true);
const sample2= new Book("The Catcher in the Rye","J. D Salinger","277",true);
const sample3= new Book("The Sound and the Fury","William Faulkner","326",false);
let myLibrary= [sample1,sample2,sample3];

// Generates HTML elements for each book 
const bookShelf=document.querySelector(".bookShelf");
const inputs=document.getElementsByName("inputs");
const submitButton=document.getElementById("submitData");

initDisplay()

function initDisplay() {
    displayAllBooks(myLibrary);
    clickSubmitBook();
}

function displayAllBooks(library) {
    for (let book in library) {
        displayBook(library[book],book)
    }
}

function displayBook(book,ident) {
    bookContainer(ident);
    bookTitle(book,ident);
    bookInfo(book,ident);
    hideBookInfo(ident);
    clickDisplayInfo(ident);
    clickDeleteBook(ident);
}

//Structure DOM elements for book data displayed in two divs title & info and a delete button within a book div  
function bookContainer(ident) {
    newContainer("book",ident,bookShelf,"div");
    newBookContainer=document.querySelector("#book"+ident);
    newContainer("title",ident,newBookContainer,"div");
    newContainer("info",ident,newBookContainer,"div");
    newContainer("read",ident,newBookContainer,"button");
    newContainer("delete",ident,newBookContainer,"button");
    delButtonContent(ident);
}

//Create div container with attrivutes
function newContainer(containerName,ident,parentContainer,elem) {
    let dataContainer=document.createElement(elem);
    dataContainer.classList.add(containerName);
    dataContainer.id=containerName+ident;
    parentContainer.appendChild(dataContainer);
}

function bookTitle(book,ident) {
    document.getElementById("title"+ident).textContent=book.title;
}
function bookInfo(book,ident) {
    document.getElementById("info"+ident).textContent=book.info();
}
function delButtonContent(ident) {
    document.getElementById("delete"+ident).textContent="X";
}

function hideBookInfo(ident) {
    document.getElementById("info"+ident).style.display="none";
}

//Use on click eventListener to toggle book's info display
function clickDisplayInfo(ident) {
    document.getElementById("title"+ident).addEventListener("click",evt=> {
        toggleInfoDisplay(evt.target);
    })
}

function toggleInfoDisplay(book) {
    info=document.getElementById(book.id).nextElementSibling;
    if(info.style.display==="none"){
        info.style.display="block";    
    }
    else {
        info.style.display="none";
    }
} 

function clickDeleteBook(ident) {
    document.getElementById("delete"+ident).addEventListener("click",evt=> {
        deleteFromLibrary(getTextContent(changeIdPrefix(evt.target.id,"title")))
        deleteBook(evt.target);
    })
}

function deleteBook(book) {
    document.getElementById(book.id).parentElement.remove();
} 

//Create book from Form using constructor, update myLibrary if not duplicate
function clickSubmitBook() {
    submitButton.addEventListener("click",function() {
        let newBook= new Book(...getInputs());
        if (isDuplicate(newBook)){
            alertDuplicate(newBook.title);
        }
        else {
            addToLibrary(newBook);
            displayBook(newBook,myLibrary.length);
        }
    })
}

//Get inputs from Form
function getInputs() { 
    let inputArray=[];
    for (let i=0; i <inputs.length-1;i++) {
        inputArray[i]=inputs[i].value;
    }
    inputArray[inputs.length-1]=inputs[inputs.length-1].checked;
    return inputArray;
}

function addToLibrary(book) {
    myLibrary.push(book)
  }

function isDuplicate(newBook) {
    for (book in myLibrary) {
        if(myLibrary[book].title===newBook.title) { return true }
    }
    return false
}

function alertDuplicate(title) {
    alert(`${title} already exists in the database`);
}

function deleteFromLibrary(titleToDelete) {
    myLibrary=myLibrary.filter(function(item) { return item.title!==titleToDelete})
}
function changeIdPrefix(oldId,newPrefix) {
    return newPrefix+oldId.replace(/\D/g,"");
}

function getTextContent(id) {
    return document.getElementById(id).textContent;
}
