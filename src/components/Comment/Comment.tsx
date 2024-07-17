import type { CommentData } from '@/types/Comment'

import axios from 'axios'
import { useEffect, useState } from 'react'

interface Props {
  id: string | undefined
}

export const Comment: React.FC<Props> = ({ id }) => {
  const [comments, setComments] = useState<CommentData[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get<CommentData[]>(`http://ec2-54-196-216-102.compute-1.amazonaws.com/wines/${id}/comments`)
        setComments(response.data)
      }
      catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchComments()
  }, [id])

  return (
    <>
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
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
            <button className="comment__reply">
              <span className="comment__next"></span>
              Reply
            </button>

            <div className="comment__estimation">
              <button className="comment__like">
              </button>
              <button className="comment__dislike">
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
