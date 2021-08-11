import { bookService } from "../services/books-service.js"

const { withRouter } = ReactRouterDOM
export class ReviewAdd extends React.Component {
    state = {
        readerName: 'Books reeader',
        reviews: []
    }
    componentDidMount() {
        this.inputRef.current.focus()
    }
    inputRef = React.createRef()
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({
            ...prevState.readerName,
            ...prevState.reviews,
            [field]: value
        }
        ))}
    


    onSaveBook = (ev) => {
        ev.preventDefault()
        const id = this.props.match.params.bookId
        const { readerName } = this.state
        if (!readerName) return alert('must fill name')
        bookService.saveBook(id, this.state.reviews)
    }

    render() {
        const id = this.props.match.params.bookId
        const { readerName, rate, date, txtRate } = this.state
        return (
            <form className="book-rate" onSubmit={this.onSaveBook}>
                <input type="text" name="readerName" ref={this.inputRef} value={readerName} onChange={this.handleChange} /><br />
                <select >
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select><br />
                <input type="date" /> Read at<br />
                <textarea cols="30" rows="10"></textarea><br /> {/* textarea resize:none on CSS */}
                <button>submit</button><br />
            </form>
        )
    }
}