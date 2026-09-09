import { useState, useEffect } from 'react'
import { Col, Container, Form ,Row } from 'react-bootstrap'
import fantasyBooks from '../../json/fantasy.json'
import SingleBook from '../singleBook/SingleBook.jsx'
import { formatPrice } from '../../utils/formatPrice.js'
import './css/AllTheBooks.css'

const cheapest = fantasyBooks.reduce(
    (lowest, book) => (book.price < lowest ? book.price : lowest),
    Infinity
)

const AllTheBooks = () => {

    const [query, setQuery] = useState('')

    const [openAsin, setOpenAsin] = useState(null)

    const needle = query.trim().toLowerCase()
    const visibleBooks = fantasyBooks.filter(book =>
        book.title.toLowerCase().includes(needle)
    )

useEffect(() => {
    if (!openAsin) return undefined

    const overPanel = target =>
        typeof target?.closest === 'function' && target.closest('.book-flyout') !== null
    const isTyping = target =>
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName) || target?.isContentEditable === true

    const close = () => setOpenAsin(null)
    const onWheel = e => {
        if (!overPanel(e.target)) close()
    }
    const onTouchMove = e => {
        if (!overPanel(e.target)) close()
    }
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
    const onKeyDown = e => {
        if (scrollKeys.includes(e.key) && !overPanel(e.target) && !isTyping(e.target)) {
            close() 
        }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('keydown', onKeyDown)
    }
}, [openAsin])

return (
    <section className="shelf">
        <Container>
            <header className="shelf-header">
                <h2 className="shelf-title">The Epibook shop</h2>
                <p className="shelf-meta">
                    {needle
                        ? `${visibleBooks.length} of ${fantasyBooks.length} titles match "${query.trim()}"`
                        : `${fantasyBooks.length} titles across every genre, all starts at ${formatPrice(cheapest)}`}
                </p>
            </header>
            
            <Form
                className="shelf-search"
                role="search"
                onSubmit={e => e.preventDefault()}
            >
                <Form.Label htmlFor="book-search" visuallyHidden>
                    Search fantasyBooks by the title
                </Form.Label>
                <Form.Control 
                    id="book-search"
                    type="search"
                    placeholder="Search by title..."
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                        setOpenAsin(null)
                    }}
                    autoComplete="off"
                />
            </Form>

            {visibleBooks.length > 0 ? (
                <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                {visibleBooks.map(book => (
                    <Col key={book.asin}>
                        <SingleBook 
                        book={book} 
                        isOpen={openAsin === book.asin}
                        onToggle={() =>
                            setOpenAsin(current => (current === book.asin ? null : book.asin))
                        }
                        />
                    </Col>
                ))}
            </Row>
            ) : (
                <p className="shelf-empty">
                    No fantasyBooks has matched your search for "<strong>{query.trim()}</strong>"
                </p>
            )}
        </Container>
    </section>
    )
}

export default AllTheBooks