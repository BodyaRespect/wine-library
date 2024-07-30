import { useEffect, useState } from 'react'

import type { Wine } from '../../types/Wine'

import { addToCartServer, addToFavorite, deleteFromFavorite, fetchComments, fetchWineRatings, removeFromCartServer } from '../../api/axiosClient'
import { useAppDispatch } from '../../store/hooks'
import { addFavorite, addToCart, removeFavorite, removeFromCart } from '../../store/reducers/products'
import { renderStars } from '../Stars/Stars'

interface Props {
  wine: Wine
  isCart: boolean
  isFavorite: boolean
  onClick: () => void
}

export const CartItem: React.FC<Props> = ({ isCart, wine, isFavorite, onClick }) => {
  const dispatch = useAppDispatch()
  const [rate, setRate] = useState(0)
  const [commentsLength, setCommentsLength] = useState(0)

  const handleToggleCart = () => {
    if (isCart) {
      dispatch(removeFromCart(wine.id))
      removeFromCartServer(wine.id)
    }
    else {
      dispatch(addToCart({ wineId: wine.id }))
      addToCartServer(wine.id)
    }
  }

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(wine.id))
      deleteFromFavorite(wine.id)
    }
    else {
      dispatch(addFavorite({ wineId: wine.id }))
      addToFavorite(wine.id)
      setRate(5)
    }
  }

  useEffect(() => {
    fetchWineRatings(wine.id)
      .then((response) => {
        setRate(response.data.average)
      })
      .catch(error => console.error('Error fetching wine ratings:', error))

    fetchComments(wine.id.toString())
      .then((response) => {
        setCommentsLength(response.data.length)
      })
      .catch(error => console.error('Error fetching wine ratings:', error))
  }, [wine.id])

  return (
    <div className="card">
      <div className="card__content">
        <div className="card__image">
          <img
            alt={wine.name}
            className="card__picture"
            src={wine.imageUrl}
          />

          <button
            className={`card__picture-${isFavorite ? 'liked' : 'like'}`}
            onClick={handleToggleFavorite}
          >
          </button>
        </div>

        <div className="card__info">
          <div className="card__name" onClick={onClick}>
            {wine.name}
          </div>

          <div className="card__country">
            <div className="card__country-flag" style={{ backgroundImage: `url(${wine.countryFlagUrl})` }}></div>

            <div className="card__country-name">
              {wine.country}
            </div>
          </div>

          <div className="card__estimates">
            {renderStars(rate)}

            <div className="card__comments">
              <span className="card__comments-icon"></span>
              <div className="card__comments-count">{commentsLength}</div>
            </div>
          </div>

          <div className="card__shipping">
            <div className="card__shipping-price">
              {wine.price}
              $
            </div>

            <button
              className={`card__shipping-${isCart ? 'clicked' : 'button'}`}
              onClick={handleToggleCart}
            >
              <div className="card__shipping-icon"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
