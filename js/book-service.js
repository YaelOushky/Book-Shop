'use strict'

const KEY = 'books'
const PAGE_SIZE = 4
var gBooks
var gPageIdx = 0
var gFilterBy = {
    vendor: '',
    minSpeed: 120
}
var gSortBy = 'vendor'
var gVendors = [
    'AWAKEN THE WILL TO LOVE',
    'ITS NOT ABOUT YOU',
    '12 STEP TO FULL TIME TRAVEL',
    'THE OFFICIAL HANDMADE MAN',
    'A FENCE IS JUST A FENCE, RIGHT',
    'HOW TO MAKE STUNNING BOOK COVER',
    'BIG PHARMA AND THE CORRUPTION'
]



function getVendors() {
    return gVendors
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()

}

function addBook(vendor) {
    var book = _createBook(vendor)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    book.price = newPrice
    _saveBooksToStorage()
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    return book
}

function getBooks() {
    return (gSortBy === 'title') ? _sortByName() : _sortByCount()
}

function _createBook(bookName) {
    return {
        id: makeId(),
        name: bookName,
        price: getRandomInt(1, 200),
        imgUrl: makeLorem(),
        rate: getRandomInt(1, 10)
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 4; i++) {
            var vendor = gVendors[i]
            books.push(_createBook(vendor))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function _sortByName() {
    return gBooks.sort(function (book1, book2) {
        var bookA = book1.name.toUpperCase()
        var bookB = book2.name.toUpperCase()

        if (bookA > bookB) return 1
        if (bookB > bookA) return -1
        else return 0
    })
}

function _sortByCount() {
    return gBooks.sort(function (book1, book2) {
        if (book1.price > book2.price) return 1
        if (book1.price < book2.price) return -1
        else return 0
    })
}

function setSort(sortBy) {
    gSortBy = sortBy
}