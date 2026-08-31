import { Col, Container, Row } from 'react-bootstrap'
import fantasyBooks from '../../json/fantasy.json'
import BookCard from './BookCard.jsx'
import { formatPrice } from '../../utils/formatPrice.js'

const cheapest = fantasyBooks.reduce(
    (lowest, book) => (book.price < lowest ? book.price : lowest),
    Infinity
)

const AllTheBooks = () => (
    <section className="shelf">
        <Container>
            <header className="shelf-header">
                <h2 className="shelf-title">The fantasy books</h2>
                <p className="shelf-meta">
                    {fantasyBooks.length} titles, starting at {formatPrice(cheapest)}
                </p>
            </header>

            <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                {fantasyBooks.map(book => (
                    <Col key={book.asin}>
                        <BookCard book={book} />
                    </Col>
                ))}
            </Row>

        </Container>
    </section>
)

export default AllTheBooks