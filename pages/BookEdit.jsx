import { bookService } from '../services/books-service.js'

export class BookEdit extends React.Component {
  state = {
    book: {
      title: '',
      price: ''
    }
  }
  componentDidMount() {
    const id = this.props.match.params.bookId
    if (!id) return
    bookService.getBookById(id).then(book => {
      this.setState({ book })
    })
  }
  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState(prevState => ({
      book: {
        ...prevState.book,
        [field]: value
      }
    }))
  }
  onSaveBook = (ev) => {
    ev.preventDefault()
    const { book } = this.state
    if (!book.title) return alert('Must fill title field')
    bookService.saveBook(this.state.book).then(() => {
      this.props.history.push('/book')
    })
  }

  render() {
    const { title, price, id } = this.state.book
    return (
      <form className="book-edit" onSubmit={this.onSavebook}>
        <h1>{id ? 'Edit' : 'Add'} book</h1>
        <label>title
          <input type="text" name="title" value={title} onChange={this.handleChange} />
        </label>
        <label>price
          <input type="number" name="price" value={price} onChange={this.handleChange} />
        </label>
        <button>Save</button>
      </form>
    )
  }
}