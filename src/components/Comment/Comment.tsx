import { useEffect, useState } from 'react'

import type { CommentData } from '../../types/Comment'
import type { CommentForm } from '../../types/CommentForm'

import { accessToken, dislikeComment, fetchComments, likeComment, postComment, postRating } from '../../api/axiosClient'
import StarRating from '../Rating/Rating'

interface Props {
  id: string | null
  comments: CommentData[] | []
}

export const Comment: React.FC<Props> = ({ id, comments }) => {
  const [rating, setRating] = useState<number>(0)
  const [leaveComment, setLeaveComment] = useState(false)
  const [commentsList, setCommentsList] = useState<CommentData[]>(comments)
  const [visibleCount, setVisibleCount] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState(true)
  const [formState, setFormState] = useState<CommentForm>({
    commentText: '',
    mainBenefits: '',
    drawbacks: '',
  })

  const handleFetchComments = async () => {
    if (id) {
      try {
        const response = await fetchComments(id)
        setCommentsList(response.data)
      }
      catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleShowMore = () => {
    if (visibleCount >= commentsList.length) {
      setVisibleCount(2)
      setIsExpanded(true)
      scrollTo(0, 0)
    }
    else {
      setVisibleCount(prevCount => Math.min(prevCount + 2, commentsList.length))
      setIsExpanded(true)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    postComment(id, formState)
      .then(() => {
        console.log('Comment success!!')
        handleFetchComments()

        setFormState({
          commentText: '',
          mainBenefits: '',
          drawbacks: '',
        })
      })
      .catch((error: any) => {
        console.error('Error adding comment:', error)
      })

    postRating(id, rating)
      .then(() => {
        console.log('Rating success!!')
        setRating(0)
      })
      .catch((error: any) => {
        console.error('Error adding rating:', error)
      })

    setLeaveComment(false)
  }

  useEffect(() => {
    handleFetchComments()
    setCommentsList(comments)
    setVisibleCount(Math.min(comments.length, 2))
  }, [comments, id])

  return (
    <>
      <div className={`comment-container ${isExpanded ? 'visible' : 'hidden'}`}>
        {commentsList.slice(0, visibleCount).map(comment => (
          <div key={comment.id}>
            <div className="comment">
              <div className="comment__header">
                <div className="comment__head">
                  <div className="comment__name">{comment.userName}</div>
                  <div className="stars stars--4"></div>
                </div>

                <div className="comment__date">{new Date(comment.createdAt).toLocaleDateString()}</div>
              </div>

              <p className="comment__content">
                {comment.text}
              </p>

              {comment.advantages.length > 0 && (
                <>
                  <div className="comment__pros"></div>
                  <ul>
                    <li>{comment.advantages}</li>
                  </ul>
                </>
              )}

              {comment.disadvantages.length > 0 && (
                <>
                  <div className="comment__cons"></div>
                  <ul>
                    <li>{comment.disadvantages}</li>
                  </ul>
                </>
              )}

              {accessToken() && (
                <div className="comment__bottom">
                  <div className="comment__estimation">
                    <button className="comment__like" onClick={() => likeComment(comment.id)}></button>
                    <button className="comment__dislike" onClick={() => dislikeComment(comment.id)}></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {commentsList.length > 2 && (
        <div className="comment__leave">
          <button onClick={handleShowMore}>
            {visibleCount >= commentsList.length ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}

      {accessToken() && !leaveComment
        ? (
          <div className="comment__leave">
            <button onClick={() => setLeaveComment(!leaveComment)}>
              Leave Comment
            </button>
          </div>
          )
        : (
          <div className={`comment-add ${leaveComment ? 'visible' : ''}`}>
            <form className="comment-add-form" onSubmit={handleSubmit}>
              <div className="comment-add-form-rate">
                <h3 className="comment-add-form-rate-title">
                  Rate this wine
                  <div className="not-required">(required)</div>
                </h3>

                <div className="comment-add-form-rate-stars">
                  <StarRating onRatingChange={handleRatingChange} rating={rating} />

                  <p>{`Your rate: ${rating}`}</p>
                </div>
              </div>

              <div className="comment-add-form-field">
                <label className="comment-add-form-field-label">
                  Leave the feedback about your consumption experience&#127815;
                </label>

                <textarea
                  className="comment-add-form-field-input"
                  id="comment"
                  name="commentText"
                  onChange={handleInputChange}
                  value={formState.commentText}
                  required
                />
              </div>

              <div className="comment-add-form-field">
                <label className="comment-add-form-field-label" htmlFor="main-benefits">
                  Please, additionally indicate the main benefits of this wine&#128523;
                  <div className="not-required">(not required)</div>
                </label>

                <input
                  className="comment-add-form-field-input"
                  id="main-benefits"
                  name="mainBenefits"
                  onChange={handleInputChange}
                  type="text"
                  value={formState.mainBenefits}
                />
              </div>

              <div className="comment-add-form-field">
                <label className="comment-add-form-field-label" htmlFor="drawbacks">
                  And if you note any shortcomings, you may also indicate them&#129300;
                  <div className="not-required">(not required)</div>
                </label>

                <input
                  className="comment-add-form-field-input"
                  id="drawbacks"
                  name="drawbacks"
                  onChange={handleInputChange}
                  type="text"
                  value={formState.drawbacks}
                />
              </div>

              <button className="comment-add-form-button" type="submit">Leave the comment</button>
            </form>
          </div>
          )}
    </>
  )
}
