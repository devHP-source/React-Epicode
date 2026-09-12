import SingleComment from '../singleComment/SingleComment.jsx'
import './css/CommentList.css'

const CommentList = ({reviews, onChanged}) => {
    if (reviews.length === 0) {
        return <p className='comment-empty'>No reviews yet, be the first one</p>
    }

    return (
        <ul className='comment-list'>
            {reviews.map(review => (
                <SingleComment key={review._id} review={review} onChanged={onChanged} />
            ))}
        </ul>
    )
}

export default CommentList