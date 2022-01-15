function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read ? "read" : "not read yet";
}
Book.prototype.info=function() {
    return `This book is by ${this.author}, ${this.pages} pages, ${this.read}`
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
        console.log(book)
        displayBook(library[book],book)
    }
}

function displayBook(book,ident) {
    BookContainer(ident);
    BookTitle(book,ident);
    BookInfo(book,ident);
    hideBookInfo(ident);
    clickDisplayInfo(ident);
}

//Structure DOM elements for book data displayed in two divs title & info within a book div  
function BookContainer(ident) {
    newContainer("book",ident,bookShelf);
    newBookContainer=document.querySelector("#book"+ident);
    newContainer("title",ident,newBookContainer);
    newContainer("info",ident,newBookContainer);
}

//Create div container with attrivutes
function newContainer(containerClassName,ident,parentContainer) {
    let dataContainer=document.createElement("div");
    dataContainer.classList.add(containerClassName);
    dataContainer.id=containerClassName+ident;
    parentContainer.appendChild(dataContainer);
}

function BookTitle(book,ident) {
    document.getElementById("title"+ident).textContent=book.title;
}
function BookInfo(book,ident) {
    document.getElementById("info"+ident).textContent=book.info();
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

//Create book from Form using constructor, update myLibrary
function clickSubmitBook() {
    submitButton.addEventListener("click",function() {
        console.log("submit clicked")
        let newBook= new Book(...retrieveInputs());
        addBookToLibrary(newBook);
        displayBook(newBook,myLibrary.length);
    })
}

//Get inputs from Form
function retrieveInputs() { 
    let inputArray=[];
    for (let i=0; i <inputs.length-1;i++) {
        inputArray[i]=inputs[i].value;
    }
    inputArray[inputs.length-1]=inputs[inputs.length-1].checked;
    return inputArray;
}

function addBookToLibrary(book) {
    return myLibrary.includes(book) ? myLibrary : myLibrary.push(book)
  }