import { gBooks } from '../data/booksDB.js'
import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'
export const bookService = {
    query,
    deleteBook,
    getBookById,
    getNextBookId,
    saveBook
}
const KEY = 'books'
_createBooks()

function query(filterBy) {
    if (filterBy) {
        var { title, maxPrice, minPrice } = filterBy
        minPrice = minPrice ? minPrice : 0
        maxPrice = maxPrice ? maxPrice : Infinity
        const filteredBooks = gBooks.filter(book => {
            return book.title.includes(title) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice
        })
        return Promise.resolve(filteredBooks)
    }
    return Promise.resolve(gBooks)
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
    return Promise.resolve()
}
function saveBook(book) {
    return book.id?_updateBook(book):_addBook(book)
}
function _addBook(bookToAdd) {
    var book = _createBook(bookToAdd.title, bookToAdd.price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return Promise.resolve(book)

}
function _createBook(title, price) {
    if (!title) price = utilService.getRandomIntInclusive(1, 200)
    return {
        id: utilService.makeId(),
        title,
        price,
        desc: utilService.makeLorem()
    }
}
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return Promise.resolve(book)
}
function _updateBook(bookToUpdate) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookToUpdate.id;
    })
    gBooks.splice(bookIdx,1,bookToUpdate)
    _saveBooksToStorage();
    return Promise.resolve(bookToUpdate)
}
function getNextBookId(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    var nextBookIdx = bookIdx + 1
    nextBookIdx = nextBookIdx === gBooks.length ? 0 : nextBookIdx
    return gBooks[nextBookIdx].id
}

function _createBooks() {
    let books = storageService.loadFromStorage(KEY)
    if (!books || !books.length) {
        books = gBooks;
    }
    _savebooksToStorage();
}
function _savebooksToStorage() {
    storageService.saveToStorage(KEY, gBooks)
}