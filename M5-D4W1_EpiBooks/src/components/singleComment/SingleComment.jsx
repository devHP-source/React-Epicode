import { useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import {Pencil, Trash2} from 'lucide-react'
import {deleteComment, updateComment} from '../../utils/commentsApi'
import './css/SingleComment.css'

const ratings = [1, 2, 3, 4, 5]

const SingleComment = ({ review, onChanged }) => {
    const stars = Math.max(0, Math.min(5, Math.round(Number(review.rate) || 0)))

    const [editing, setEditing] = useState(false)
    const [draftText, setDraftText] = useState('')
    const [draftRate, setDraftRate] = useState('5')
    const [status, setStatus] = useState('idle')

    const startEdit = () => {
        setDraftText(review.comment)
        setDraftRate(String(review.rate))
        setStatus('idle')
        setEditing(true)
    }

    const cancelEdit = () => {
        setEditing(false)
        setStatus('idle')
    }

    const handleSave = async () => {
        if (!draftText.trim()) return setStatus('saving')
            try {
                await updateComment(review._id, {
                    comment: draftText.trim(),
                    rate: draftRate,
                    elementId: review.elementId,
                })
                setEditing(false)
                setStatus('idle')
                onChanged()
            } catch {
                setStatus('error')
            }
    }

    const handleDelete = async () => {
        setStatus('deleting')
        try {
            await deleteComment(review._id)
            onChanged()
        } catch {
            setStatus('error')
        }
    }

    if (editing) {
        return (
            <li>
                <Form>
                    <Form.Control 
                    as="textarea"
                    rows={2}
                    value={draftText}
                    onChange={e => setDraftText(e.target.value)}
                    aria-label="Edit the review text"
                    />
                    <Form.Select
                    value={draftRate}
                    onChange={e => setDraftRate(e.target.value)}
                    aria-label="Edit rating"
                    >
                        {ratings.map(value => (
                            <option key={value} value={value}>
                                {value} / 5
                            </option>
                        ))}
                    </Form.Select>

                    <div>
                        <Button
                        type='button'
                        className='comment-save'
                        onClick={handleSave}
                        disabled={status === 'saving' || !draftText.trim()}
                        >
                            {status === 'saving' ? (
                                <>
                                <Spinner as='span' animation='border' size='sm' aria-hidden="true" />
                                <span>Saving...</span>
                                </>
                            ): (
                                'Save'
                            )}
                        </Button>
                        <Button
                        type='button'
                        variant='link'
                        className='comment-cancel'
                        onClick={cancelEdit}
                        disabled={status === 'saving'}
                        >
                        Cancel
                        </Button>
                    </div>

                    {status === 'error' && (
                        <p className='comment-error' role='alert'>Something went wrong with your changes, Try again</p>
                    )}
                </Form>
            </li>
        )
    }

    return (
        <li className='comment'>
            <div className='comment-head'>
                <span className='comment-rating' role='img' aria-label={`Rated ${stars} out of 5`}>
                    {'★'.repeat(stars)}
                    {'☆'.repeat(5 - stars)}
                </span>

                <div className='comment-actions'>
                    <button
                    type='button'
                    className='comment-action'
                    onClick={startEdit}
                    disabled={status === 'deleting'}
                    aria-label='Edit review'
                    >
                        <Pencil aria-hidden="true" />
                    </button>
                    <button
                    type='button'
                    className='comment-action comment-action-delete'
                    onClick={handleDelete}
                    disabled={status === 'deleting'}
                    aria-label='Delete review'
                    >
                        {status === 'deleting' ? (
                            <Spinner as="span" animation='border' size='sm' aria-hidden="true" />
                        ) : (
                            <Trash2 aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            <p className='comment-text'>{review.comment}</p>

            {status === 'error' && (
                <p className='comment-error' role='alert'>Something went wrong deleting this review, Try again</p>
            )}
        </li>
    )
}

export default SingleComment