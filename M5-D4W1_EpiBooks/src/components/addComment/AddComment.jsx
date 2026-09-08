import {useState} from 'react'
import {Button, Form, Spinner} from 'react-bootstrap'
import {createComment} from '../../utils/commentsApi'
import './css/AddComment.css'

const ratings = [1, 2, 3, 4, 5]

const AddComment = ({ asin, onCommentAdded}) => {
    const [comment, setComment] = useState('')
    const [rate, setRate] = useState('5')
    const [status, setStatus] = useState('idle')

    const handleSubmit = async (e) => {
        if (!comment.trim()) return setStatus("sending")
            try {
                await createComment({ comment: comment.trimEnd(), rate, elementId: asin})
                setComment('')
                setRate('5')
                setStatus('idle')
                onCommentAdded()
        } catch {
            setStatus("error")
        }
    }

    return (
        <Form className='add-comment' onSubmit={e => e.preventDefault()}>
            <Form.Group className='add-comment-field'>
                <Form.Label htmlFor={`review-text-${asin}`}>Your Review</Form.Label>
                <Form.Control 
                    as="textarea"
                    id={`review-text-${asin}`}
                    rows={2}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Write your review here..."
                />
            </Form.Group>

            <Form.Group className='add-comment-field'>
                <Form.Label htmlFor={`review-rate-${asin}`}>Rating</Form.Label>
                <Form.Select
                    id={`review-rate-${asin}`}
                    value={rate}
                    onChange={e => setRate(e.target.value)}
                >
                    {ratings.map(value => (
                        <option key={value} value={value}>
                            {value} / 5
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button
            type="button"
            className="add-comment-submit"
            onClick={handleSubmit}
            disabled={status === "sending" || !comment.trim()}
            >
                {status === "sending" ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" aria-hidden="true" />
                        <span>Sending...</span>
                    </>
                ) : (
                    'Send review'
                )}
            </Button>

            {status === 'error' && (
                <p className="comment-error" role="alert">
                    Something went wrong, Try again.
                </p>
            )}
        </Form>
    )
}

export default AddComment