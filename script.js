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
let bookCounter=0;
const bookShelf=document.querySelector(".bookShelf");
const inputs=document.getElementsByName("inputs");
const submitButton=document.getElementById("submitData");
displayAllBooks(myLibrary);
clickSubmitBook();

// Add click eventListener on book title to display info 
//let bookCollection=document.querySelectorAll(".title");
//clickDisplayInfo();

function addBookToLibrary(book) {
    return myLibrary.includes(book) ? myLibrary : myLibrary.push(book)
  }

function retrieveInputs() { 
    let inputArray=[];
    for (let i=0; i <inputs.length-1;i++) {
        inputArray[i]=inputs[i].value;
    }
    inputArray[inputs.length-1]=inputs[inputs.length-1].checked;
    return inputArray;
}

function displayAllBooks(library) {
    for (let book in library) {
        console.log(book)
        displayBook(library[book],book)
    }
}

function displayBook(book,ident) {
    createBookContainer(ident);
    createBookTitle(book,ident);
    createBookInfo(book,ident);
    hideBookInfo(ident);
    clickDisplayInfo(ident);
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


// function clickDisplayInfo() {
//     bookCollection.forEach(item => {
//         item.addEventListener("click",evt=> {
//             toggleInfoDisplay(evt.target);
//         })
//     })
// }

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

function clickSubmitBook() {
    submitButton.addEventListener("click",function() {
        console.log("submit clicked")
        let newBook= new Book(...retrieveInputs());
        addBookToLibrary(newBook);
        displayBook(newBook,myLibrary.length);
        
      
    })
}