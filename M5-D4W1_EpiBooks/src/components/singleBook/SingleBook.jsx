import {useState} from 'react'
import {Card} from 'react-bootstrap'
import {BookOpen} from 'lucide-react'
import {formatPrice} from '../../utils/formatPrice.js'
import {coverUrl} from '../../utils/coverUrl.js'
import './css/SingleBook.css'

const SingleBook = ({ book, selected, onSelect }) => {
    const [coverFailed, setCoverFailed] = useState(false)
    const isSelected = selected === book.asin

/*
    if (isOpen && !hasOpened) {
        setHasOpened(true)
    }

    const flyoutId = `reviews-${book.asin}`
*/
    return (
        <Card className={`book${isOpen ? ' book-open' : '' }`}>
            <button
                type="button"
                className="book-frame"
                onClick={() => onSelect(book.asin)}
                aria-pressed={isSelected}
                aria-label={`Show reviews for ${book.title}`}
            >
                {coverFailed ? (
                    <div className="book-fallback">
                        <BookOpen aria-hidden="true" />
                    </div>
                ) : (
                    <Card.Img 
                        variant="top"
                        src={coverUrl(book.img)}
                        alt={book.title}
                        className="book-cover"
                        loading="lazy"
                        decoding="async"
                        onError={() => setCoverFailed(true)}
                    />
                )}
            </button>
            <Card.Body className="book-body">
                <Card.Title className="book-title">{book.title}</Card.Title>
                <p className="book-price">{formatPrice(book.price)}</p>
            </Card.Body>
        </Card>
    )
}

export default SingleBook