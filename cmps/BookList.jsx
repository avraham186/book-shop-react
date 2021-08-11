import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, setSelectedBook }) {
  return (
      <div className="book-list">
      { books.map(book => <BookPreview book={book} key={book.id}  />)}
    </div>
  )
}
//setSelectedBook={setSelectedBook}