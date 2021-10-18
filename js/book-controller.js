'use strict'
var gIsTable = true

function onInit() {
    _createBooks()
    renderBooks()
    renderVendors()
}

// function renderBooks2() {
//     var books = getBooks()
//     var strHtmls = books.map(function (book) {
//         return `
//         <article class="book-preview">
//             <img class="card-img-top" src="img/${book.name}.png" alt="Card image cap">
//             <span class="delete-btn" onclick="onDeleteBook('${book.id}')">X</span>
//             <div class="card-body">
//                 <h5 class="card-title">${book.name}</h5>
//                 <p class="card-text">price: ${book.price} $</p>
//                <button class="read" onclick="onReadBook('${book.id}')">Read</button>
//                <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
//                <button class="delete" onclick="onDeleteBook('${book.id}')">Delete</button>
//             </div>
//         </article> 
//         `
//     })
//     document.querySelector('.books-container2').innerHTML = strHtmls.join('')
// }

function renderBooks() {
    var books = getBooks()
    if (gIsTable) {

        var strHTML = `<table border="1"><tbody ><tr>
        <th>Id</th>
        <th class="title" onclick="onSetSort('title')">Title</th>
        <th class="title" onclick="onSetSort('price')">Price</th>
        <th colspan="3" >Actions</th>`

        var eltd = books.map(function (book) {
            return `<tr><td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price} $</td>
            <td> <button class="read" onclick="onReadBook('${book.id}')">Read</button></td>
            <td> <button class="update" onclick="onUpdateBook('${book.id}')">Update</button> </td> 
            <td> <button class="delete" onclick="onDeleteBook('${book.id}')">Delete</button> </td>
            </tr>`
        })
        strHTML += eltd.join('') + `</tbody></table>`
        document.querySelector('.books-container').innerHTML = strHTML
    } else {
        console.log('test');
        var strHtmls = books.map(function (book) {
            return `
            <article class="book-preview">
            <span class="delete-btn" onclick="onDeleteBook('${book.id}')">X</span>
                <img class="card-img-top" src="img/${book.name}.png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${book.name}</h5>
                    <p class="card-text">price: ${book.price} $</p>
                   <button class="read" onclick="onReadBook('${book.id}')">Read</button>
                   <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
                   <button class="delete" onclick="onDeleteBook('${book.id}')">Delete</button>
                </div>
            </article> 
            `
        })
        var el = document.querySelector('.books-container2').innerHTML = strHtmls.join('')
        console.log(document.querySelector('.books-container'));
    }
}

function renderVendors() {
    var vendors = getVendors()
    var strHtmls = vendors.map(vendor => `<option>${vendor}</option>`)
    document.querySelector('.vendor-list').innerHTML = strHtmls.join('')
}


function onClickViewMode(displayMode) {
    gIsTable = displayMode === 'TABLE'
    console.log('gIsTable', gIsTable)
    var elTable = document.querySelector('.books-container')
    var elGrid = document.querySelector('.books-container2')
    if (!gIsTable) {
        elGrid.style.display = 'flex'
        elTable.style.display = 'none'
        renderBooks()
    } else {
        elGrid.style.display = 'none'
        elTable.style.display = 'block'
        renderBooks()
    }
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('new price?')
    updateBook(bookId, newPrice)
    renderBooks()
}

function onAddBook() {
    const vendor = document.querySelector('.vendor-list').value
    addBook(vendor)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = ' Price: ' + book.price
    elModal.querySelector('h4').innerHTML = `<img class="card-img-top" src="img/${book.name}.png" alt="Card image cap">`
    elModal.querySelector('p').innerText = book.imgUrl
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onSetSort(sortBy) {
    console.log('sortBy', sortBy)
    setSort(sortBy)
    renderBooks()
}