function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read; //true or false
}
Book.prototype.info=function() {
    return `This book is by ${this.author}, ${this.pages} pages.`;
}
Book.prototype.toggleRead=function() {
    return this.read = !this.read;
}

//let myLibrary= [];
const sample1= new Book("To Kill a Mockingbird","Harper Lee","281",true);
const sample2= new Book("The Catcher in the Rye","J. D Salinger","277",true);
const sample3= new Book("The Sound and the Fury","William Faulkner","326",false);
let myLibrary= [sample1,sample2,sample3];

// Generates HTML elements for each book 
const isRead={true:"read" , false:"not read"};
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
    readButtonContent(book,ident);
    delButtonContent(ident);
    clickDisplayInfo(ident);
    clickDeleteBook(ident);
    clickUpdateRead(ident);
}

//Structure DOM elements for book data displayed in two divs title & info and a delete button within a book div  
function bookContainer(ident) {
    newContainer("book",ident,bookShelf,"div");
    newBookContainer=document.querySelector("#book"+ident);
    newContainer("textContainer",ident,newBookContainer,"div");
    newtextContainer=document.querySelector("#textContainer"+ident);
    newContainer("title",ident,newtextContainer,"div");
    newContainer("info",ident,newtextContainer,"div");
    newContainer("buttonContainer",ident,newBookContainer,"div");
    newButtonContainer=document.querySelector("#buttonContainer"+ident);
    newContainer("read",ident,newButtonContainer,"button");
    newContainer("delete",ident,newButtonContainer,"button");
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
function readButtonContent(book,ident) {
    document.getElementById("read"+ident).textContent=isRead[book.read];
    readButtonColor(document.getElementById("read"+ident),book.read);
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
    let info = document.getElementById(book.id).nextElementSibling;
    let currentDisplay = info.style.display;
    info.style.display = currentDisplay==="none" ? "block" : "none";
} 
function clickDeleteBook(ident) {
    document.getElementById("delete"+ident).addEventListener("click",evt=> {
        deleteFromLibrary(getTextContent(changeIdPrefix(evt.target.id,"title")))
        deleteBook(changeIdPrefix(evt.target.id,"book"));
    })
}
function deleteBook(bookId) {
    document.getElementById(bookId).remove();
} 
function clickUpdateRead(ident) {
    document.getElementById("read"+ident).addEventListener("click",evt=> {
        let bookTitle=getTextContent(changeIdPrefix(evt.target.id,"title"));
        let bookIdent=findInLibrary(bookTitle);       
        updateLibrary("optional","read",bookIdent,myLibrary);
        evt.target.textContent=isRead[myLibrary[bookIdent].read];
        document.getElementById(changeIdPrefix(evt.target.id,"info")).textContent=myLibrary[bookIdent].info();;
        readButtonColor(evt.target,myLibrary[bookIdent].read);
    })
}
function updateLibrary(data,dataField,bookIdent,library) {
    dataField==="read" ? library[bookIdent].toggleRead() : library[bookIdent][dataField]=data;
 }
 function findInLibrary(bookTitle) {
    for (book in myLibrary) {
        if(myLibrary[book].title===bookTitle) { return book }
    }
}
//Create book from Form using constructor, update myLibrary if not duplicate
function clickSubmitBook() {
    submitButton.addEventListener("click",function() {
        let newBook= new Book(...getInputs());
        if (dataValidation(newBook)){
            addToLibrary(newBook);
            displayBook(newBook,myLibrary.length);
        }
    })
}
function dataValidation(newBook) {
    let errorString="";
    errorString+= isDuplicate(newBook) ? "*"+Duplicate(newBook.title)+"\n" : ""
    errorString+= !isValidNumber(newBook.pages) ? "*"+notValidNumber()+"\n" : ""
    errorString+= isEmpty(newBook) ? "*"+EmptyForm()+"\n" : ""
    if (errorString==="") {
        return true;
    }
    else {
        alert("********************************************\n"+errorString+"\n********************************************");
        return false;
    }
}
function isEmpty(newBook) {
    for (data in newBook) {
        if(newBook[data]==="") { return true };
    }
    return false;
}
function isDuplicate(newBook) {
    for (book in myLibrary) {
        if(myLibrary[book].title===newBook.title) { return true }
    }
    return false
}
//check for positive integer
function isValidNumber(bookPages) {
   return /^\d+$/.test(bookPages) ? true : false 
}
function Duplicate(title) {
    return (`${title} already exists in the database`);
}
function EmptyForm() {
    return (`Boxes in red are required!`);
}
function notValidNumber() {
    return (`Please enter a valid number of pages!`);
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
function deleteFromLibrary(titleToDelete) {
    myLibrary=myLibrary.filter(function(item) { return item.title!==titleToDelete})
}
function changeIdPrefix(oldId,newPrefix) {
    return newPrefix+oldId.replace(/\D/g,"");
}
function getTextContent(id) {
    return document.getElementById(id).textContent;
}
function readButtonColor(element,isRead) {
    isRead ? element.style.backgroundColor="RGB(247,182,120)" : element.style.backgroundColor="RGB(190,210,215)";
}


