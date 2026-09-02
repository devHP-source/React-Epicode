import {useState} from 'react'
import {Card} from 'react-bootstrap'
import {BookOpen} from 'lucide-react'
import {formatPrice} from '../../utils/formatPrice.js'
import {coverUrl} from '../../utils/coverUrl.js'

const SingleBook = ({ book }) => {
    const [coverFailed, setCoverFailed] = useState(false)
    const [selected, setSelected] = useState(false)

    return (
        <Card className={`book${selected ? 'book-selected' : '' }`}>
            <button
                type="button"
                className="book-frame"
                onClick={() => setSelected(prev => !prev)}
                aria-pressed={selected}
                aria-label={`${selected ? 'Deselect' : 'Select'} ${book.title}`}
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