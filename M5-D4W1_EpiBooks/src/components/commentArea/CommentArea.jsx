import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import {getComments} from '../../utils/commentsApi'
import CommentList from '../commentList/CommentList.jsx'
import AddComment from '../addComment/AddComment.jsx'
import './css/CommentArea.css'

const CommentArea = ({asin}) => {

    const [reviews, setReviews] = useState([])

    const [reviewsAsin, setReviewsAsin] = useState(null)
    const [status, setStatus] = useState('loading')
    const [reloadToken, setReloadToken] = useState(0)

    useEffect(() => {
        if(!asin) return undefined

        let active = true
        const load = async () => {
            try {
                const data = await getComments(asin)
                    if (active) {
                        setReviews(data)
                        setReviewsAsin(asin)
                        setStatus('ready')
                    }
            } catch {
                if (active) {
                    setReviewsAsin(asin)
                    setStatus('error')
                } 
            }
        }

        load()
        return () => {
            active = false
        }
    }, [asin, reloadToken])

    const refreshComments = () => {
        setReloadToken(token => token + 1)
    }

    const retry = () => {
        setStatus('loading')
        setReloadToken(token => token + 1)
    }

    const showList = status === 'ready' && reviewsAsin === asin
    const showError = status === 'error' && reviewsAsin === asin

    return (
        <section className='comment-area'>
            <h3 className='comment-area-title'>Reviews</h3>

            {!asin ? (
                <p>Select a book from the left to see the reviews</p>
            ) : (
                <>
                    {showError ? (
                        <div className='comment-load-error' roles="alert">
                            <span>Something went wrong, can't load reviews</span>
                            <button type='button' className='comment-retry' onClick={retry}>
                                Try again
                            </button>
                        </div>
                    ) : showList ? (
                        <CommentList reviews={reviews} onChanged={refreshComments} />
                    ) : (
                        <div className='comment-status' role='status'>
                            <Spinner animation='border' size='sm' aria-hidden="true" />
                            <span>Loading reviews...</span>
                        </div>
                    )}

                    <AddComment asin={asin} onCommentAdded={refreshComments} />
                </>
            )}
        </section>
    )
}

export default CommentArea