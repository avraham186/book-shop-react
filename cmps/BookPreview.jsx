const {Link} = ReactRouterDOM
export function BookPreview({ book, setSelectedBook }) {
    const getCurrency = () => {
        switch (book.listPrice.currencyCode) {
            case 'EUR':
                return '€'
            case 'ILS':
                return '₪'
            case 'USD':
                return '$'
        }
    }
    return (
        <Link to={`/book/${book.id}`}>
            <article className="book-preview" >
                <img src={book.thumbnail} alt="" />
                <p>title - {book.title}</p>
                <p>price - {book.listPrice.amount}<span>{getCurrency()}</span></p>
            </article>
        </Link>
    )
}