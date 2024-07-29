import axios from 'axios'
import { useState } from 'react'

import type { CommentData } from '../../types/Comment'
import type { CommentForm } from '../../types/CommentForm'

import { accessToken } from '../../api/axiosClient'
import StarRating from '../Rating/Rating'

interface Props {
  id: string | null
  comments: CommentData[] | []
}

export const Comment: React.FC<Props> = ({ id, comments }) => {
  console.log(id)
  const [rating, setRating] = useState<number>(0)
  const [leaveComment, setLeaveComment] = useState(false)
  const [formState, setFormState] = useState<CommentForm>({
    commentText: '',
    mainBenefits: '',
    drawbacks: '',
  })

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted with state:', formState, rating)

    axios.post(`https://api.winelibrary.wuaze.com/wines/${id}/comments`, {
      text: formState.commentText,
      advantages: formState.mainBenefits,
      disadvantages: formState.drawbacks,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })
      .then(() => {
        console.log('Comment success!!')
        setFormState({
          commentText: '',
          mainBenefits: '',
          drawbacks: '',
        })
      })
      .catch((error) => {
        console.error('Error adding comment:', error)
      })

    axios.post(`https://api.winelibrary.wuaze.com/wines/${id}/ratings`, {
      rating: rating,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })
      .then(() => {
        console.log('Rating success!!')
        setRating(0)
      })
      .catch((error) => {
        console.error('Error adding rating:', error)
      })

    setLeaveComment(false)
  }

  return (
    <>
      {comments.map(comment => (
        <div key={comment.id}>
          <div className="comment">
            <div className="comment__header">
              <div className="comment__head">
                <div className="comment__name">{comment.userName}</div>
                <div className="stars stars--4">
                </div>
              </div>

              <div className="comment__date">{new Date(comment.createdAt).toLocaleDateString()}</div>
            </div>

            <p className="comment__content">
              {comment.text}
            </p>

            <div className="comment__pros"></div>
            <ul>
              <li>{comment.advantages}</li>
            </ul>

            <div className="comment__cons"></div>
            <ul>
              <li>{comment.disadvantages}</li>
            </ul>

            <div className="comment__bottom">
              <div className="comment__estimation">
                <button className="comment__like"></button>
                <button className="comment__dislike"></button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {!leaveComment
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
                <h3>
                  Rate this wine
                  <div className="not-required">(required)</div>
                </h3>

                <div className="comment-add-form-rate-stars">
                  <StarRating onRatingChange={handleRatingChange} rating={rating} />

                  <p>
                    {`Your rate: ${rating}`}
                  </p>
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
