import {useState} from 'react'
import {Card} from 'react-bootstrap'
import {BookOpen} from 'lucide-react'
import {formatPrice} from '../../utils/formatPrice.js'
import {coverUrl} from '../../utils/coverUrl.js'

const BookCard = ({ book }) => {
    const [coverFailed, setCoverFailed] = useState(false)

    return (
        <Card className="book">
            <div className="book-frame">
                {coverFailed ? (
                    <div className="book-fallback">
                        <BookOpen aria-hidden="true" />
                    </div>
                ) : (
                    <Card.Img 
                    variant="top"
                    src={coverUrl(book.Img)}
                    alt={book.title}
                    className="book-cover"
                    loading="lazy"
                    decoding="async"
                    onError={() => setCoverFailed(true)}
                    />
                )}
            </div>
            <Card.Body className="book-body">
                <Card.Title className="book-title">{book.title}</Card.Title>
                <p className="book-price">{formatPrice(book.price)}</p>
            </Card.Body>
        </Card>
    )
}
export default BookCard