import axios from 'axios'
import { useEffect, useState } from 'react'

import type { CommentData } from '../../types/Comment'

interface Props {
  id: string | undefined
}

interface FormState {
  commentText: string
  mainBenefits: string
  drawbacks: string
}

export const Comment: React.FC<Props> = ({ id }) => {
  const [comments, setComments] = useState<CommentData[]>([])
  const [leaveComment, setLeaveComment] = useState(false)
  const [formState, setFormState] = useState<FormState>({
    commentText: '',
    mainBenefits: '',
    drawbacks: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted with state:', formState)

    setFormState({
      commentText: '',
      mainBenefits: '',
      drawbacks: '',
    })

    setLeaveComment(false)
  }

  useEffect(() => {
    axios.get<CommentData[]>(`https://api.winelibrary.wuaze.com/wines/${id}/comments`)
      .then((response) => {
        setComments(response.data)
      })
      .catch((error) => {
        console.error('Error fetching comments:', error)
      })
  }, [id])

  return (
    <>
      {comments.map(comment => (
        <div key={comment.id}>
          <div className="comment">
            <div className="comment__header">
              <div className="comment__head">
                <div className="comment__name">{comment.userName}</div>
                <div className="stars stars--4">
                  {/* Star Logic */}
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
              <button className="comment__reply" onClick={() => setLeaveComment(!leaveComment)}>
                <span className="comment__next"></span>
                {leaveComment ? ('Hide') : ('Reply')}
              </button>

              <div className="comment__estimation">
                <button className="comment__like"></button>
                <button className="comment__dislike"></button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className={`comment-add ${leaveComment ? 'visible' : ''}`}>
        <form className="comment-add-form" onSubmit={handleSubmit}>
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
    </>
  )
}
