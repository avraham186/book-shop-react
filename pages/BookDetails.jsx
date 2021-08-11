const { Link } = ReactRouterDOM
import { LongTxt } from '../cmps/LongTxt.jsx'
import { bookService } from '../services/books-service.js'

export class BookDetails extends React.Component {
    state = {
        book: null,
        isLongTxtShown: null,
    }

    componentDidMount() {
        this.loadBook()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }
    loadBook() {
        const id = this.props.match.params.bookId
        bookService.getBookById(id).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book })
            this.longTxt()
        })
    }
    onDeleteBook = () => {
        bookService.deleteBook(this.state.book.id)
            .then(() => {
                this.props.history.push('/book')
            })
    }
    getPageCount = (pageCount) => {
        if (pageCount > 500) {
            return 'Long Reading'
        } else if (pageCount > 200) {
            return 'Decent Reading'
        } else if (pageCount < 100) {
            return 'Light Reading'
        } else {
            return ' '
        }

    }
    getPublishedDate = (publishedDate) => {
        const year = new Date().getFullYear()
        if (publishedDate + 10 <= year) {
            return 'Veteran Book'
        } else if (publishedDate + 1 <= year) {
            return 'New'
        }
    }
    redOrGreen = (bookPrice) => {
        if (bookPrice > 150) {
            return 'book-details red'
        } else if (bookPrice < 20) {
            return 'book-details green'
        } else {
            return 'book-details'
        }
    }
    bookOnSale = (isOnSale) => {
        if (isOnSale) {
            return ' this book is on sale buy it now'
        }
    }
    longTxt = () => {
        const txt = this.state.book.description
        if (txt.length > 100) {
            this.setState({ isLongTxtShown: true })
        } else {
            this.setState({ isLongTxtShown: false })
        }
    }

    render() {
        if (!this.state.book) return <h1>loading...</h1>

        const { book } = this.state
        const { thumbnail, pageCount, publishedDate, description, listPrice } = book
        const { amount, isOnSale } = listPrice
        return (
            <div className={this.redOrGreen(amount)}>
                <img src={thumbnail} alt="" />
                <p>{pageCount} pages - {this.getPageCount(pageCount)}</p>
                <p>published at {publishedDate} - {this.getPublishedDate(publishedDate)}</p>
                <p>{this.bookOnSale(isOnSale)}</p>
                <LongTxt text={description} isLongTxtShown={this.state.isLongTxtShown} />
                <div className="actions">
                    <button onClick={this.onDeleteBook}>Delete Book</button>
                    <Link to={`/book/ReviewAdd/${book.id}`}>Add Review</Link>
                    <Link to={`/book/edit/${book.id}`}>Edit</Link>
                    <Link to={`/book/${bookService.getNextBookId(book.id)}`}>Next Book</Link>
                </div>
            </div>
        )
    }
}