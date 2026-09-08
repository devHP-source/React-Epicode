import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import {getComments} from '../../utils/commentsApi'
import CommentList from '../commentList/CommentList.jsx'
import AddComment from '../addComment/AddComment.jsx'
import './css/CommentArea.css'

const CommentArea = ({asin}) => {

    const [reviews, setReviews] = useState([])
    const [status, setStatus] = useState('loading')
    const [reloadToken, setReloadToken] = useState(0)

    useEffect(() => {
        let active = true

        const load = async () => {
            try {
                const data = await getComments(asin)
                    if (active) {
                        setReviews(data)
                        setStatus('ready')
                    }
            } catch (error) {
                if (active) setStatus('error')
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

    return (
        <section className='comment-area'>
            <h3 className='comment-area-title'>Reviews</h3>

            {status === 'loading' && (
                <div className='comment-status' role='status'>
                    <Spinner animation='border' size='sm' area-hidden="true" />
                    <span>Loading reviews...</span>
                </div>
            )}

            {status === 'error' && (
                <div className='comment-load-error' role='alert'>
                    <span>Can't load reviews</span>
                    <button type='button' className='comment-retry' onClick={retry}>
                        Please try again
                    </button>
                </div>
            )}

            {status === 'ready' && (
                <CommentList reviews={reviews} onChanged={refreshComments} />
            )}

            <AddComment asin={asin} onCommentAdded={refreshComments} />
        </section>
    )
}

export default CommentArea