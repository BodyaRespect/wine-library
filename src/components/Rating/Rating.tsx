import React, { useState } from 'react'

const Star: React.FC<StarProps> = ({ filled, onMouseEnter, onMouseLeave, onClick }) => (
  <span
    className="rating__star"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ cursor: 'pointer', color: filled ? 'gold' : 'gray' }}
  >
    ★
  </span>
)

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState<number>(0)

  const handleMouseEnter = (index: number) => {
    setHover(index)
  }

  const handleMouseLeave = () => {
    setHover(0)
  }

  const handleClick = (index: number) => {
    onRatingChange(index)
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map(index => (
        <Star
          filled={index <= (hover || rating)}
          index={index}
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  )
}

interface StarProps {
  index: number
  filled: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export default StarRating
