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
const test1= new Book("toto","Maurice Jean","230",true);
const test2= new Book("layla","Eric Clap","130",false);
const test3= new Book("L'art du Oud","Amin Maalof","510",true);
let myLibrary= [test1,test2,test3];
let bookShelf=document.querySelector(".bookShelf");

function addBookToLibrary(book) {
    return myLibrary.includes(book) ? myLibrary : myLibrary.push(book)
  }



displayBooks(myLibrary);
let bookCollection=document.querySelectorAll(".title");
let bookInfoCollection=document.querySelectorAll(".info");
clickDisplayInfo();


function displayBooks(library) {
   for (let book in library) {
        createBookContainer(book);
        createBookTitle(library[book],book);
        createBookInfo(library[book],book);
        hideBookInfo(book);
    }
}

function createBookContainer(ident) {
    createSubContainer("book",ident,bookShelf);
    newBookContainer=document.querySelector("#book"+ident);
    createSubContainer("title",ident,newBookContainer);
    createSubContainer("info",ident,newBookContainer);
}

function createSubContainer(containerClassName,ident,parentContainer) {
    let dataContainer=document.createElement("div");
    dataContainer.classList.add(containerClassName);
    dataContainer.id=containerClassName+ident;
    parentContainer.appendChild(dataContainer);
}

function createBookTitle(book,ident) {
    document.getElementById("title"+ident).textContent=book.title;
}
function createBookInfo(book,ident) {
    document.getElementById("info"+ident).textContent=book.info();
}

function hideBookInfo(ident) {
    document.getElementById("info"+ident).style.display="none";
}

function toggleInfoDisplay(book) {
    info=document.getElementById(book.id).nextElementSibling
    if(info.style.display==="none"){
        info.style.display="block";    
    }
    else {
        info.style.display="none";
    }
} 

function clickDisplayInfo() {
    bookCollection.forEach(item => {
        item.addEventListener("click",evt=> {
            toggleInfoDisplay(evt.target)
        })
    })
}








