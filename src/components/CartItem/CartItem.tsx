import axios from 'axios'
import { useEffect, useState } from 'react'

import type { Wine } from '../../types/Wine'

import { addToCartServer, addToFavorite, deleteFromFavorite, removeFromCartServer } from '../../api/axiosClient'
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
  const [rate, setRate] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.get(`https://ec2-54-196-216-102.compute-1.amazonaws.com/wines/${wine.id}/ratings`)
      .then((response) => {
        const averageRate = response.data.average
        if (typeof averageRate === 'number' && averageRate >= 0 && averageRate <= 5) {
          setRate(averageRate)
        }
        else {
          console.error('Invalid rate value:', averageRate)
        }
      })
      .catch(error => console.error('Error fetching wine data:', error))
  }, [wine.id])

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
      setRate(0)
    }
  }

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
              <div className="card__comments-count">50</div>
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
