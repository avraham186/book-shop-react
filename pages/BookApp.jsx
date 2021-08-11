const { Link } = ReactRouterDOM
import { bookService } from '../services/books-service.js'
import { eventBusService } from '../services/event-bus-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export class BookApp extends React.Component {
    state = {
        books: null,
        filterBy: null,
        selectedBook: null
    }
    componentDidMount() {
        this.loadBooks()
    }

    loadBooks() {
        bookService.query(this.state.filterBy)
            .then((books) => {
                this.setState({ books })
                eventBusService.emit('book-count', books.length)
            })
    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        const { books } = this.state
        if (!books) return <div>Loading...</div>
        return <section className="book-app">
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} setSelectedBook={this.setSelectedBook} />
                <Link className="add-btn" to="/book/edit">Add Book</Link>
        </section>
    }
}