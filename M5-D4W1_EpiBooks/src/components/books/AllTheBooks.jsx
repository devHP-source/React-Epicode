import { useState } from 'react'
import { Col, Container, Form ,Row } from 'react-bootstrap'
import fantasyBooks from '../../json/fantasy.json'
import SingleBook from './SingleBook.jsx'
import { formatPrice } from '../../utils/formatPrice.js'

const cheapest = fantasyBooks.reduce(
    (lowest, book) => (book.price < lowest ? book.price : lowest),
    Infinity
)

const AllTheBooks = () => {

    const [query, setQuery] = useState('')

    const needle = query.trimEnd().toLowerCase()
    const visibleBooks = fantasyBooks.filter(book =>
        book.title.toLowerCase().includes(needle)
    )

return (
    <section className="shelf">
        <Container>
            <header className="shelf-header">
                <h2 className="shelf-title">The fantasy books</h2>
                <p className="shelf-meta">
                    {needle
                        ? `${visibleBooks.length} of ${fantasyBooks.length} titles match "${query.trim()}"`
                        : `${fantasyBooks.length} titles, starting at ${formatPrice(cheapest)}`}
                </p>
            </header>
            
            <Form
                className="shelf-search"
                role="search"
                onSubmit={event => event.preventDefault()}
            >
                <Form.Label htmlFor="book-search" visuallyHidden>
                    Search books by the title
                </Form.Label>
                <Form.Control 
                    id="book-search"
                    type="search"
                    placeholder="Search by title..."
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    autoComplete="off"
                />
            </Form>

            {visibleBooks.length > 0 ? (
                <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                {visibleBooks.map(book => (
                    <Col key={book.asin}>
                        <SingleBook book={book} />
                    </Col>
                ))}
            </Row>
            ) : (
                <p className="shelf-empty">
                    No books has matched your search for "<strong>{query.trim()}</strong>"
                </p>
            )}
        </Container>
    </section>
    )
}

export default AllTheBooks