import type { Wine } from '@/types/Wine'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { renderStars } from '../Stars/Stars'

interface Props {
  wine: Wine
}

export const CartItem: React.FC<Props> = ({ wine }) => {
  const [rate, setRate] = useState(0)

  useEffect(() => {
    axios.get(`http://ec2-54-196-216-102.compute-1.amazonaws.com/wines/${wine.id}/ratings`)
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

  return (
    <div className="card">
      <div className="card__content">
        <div className="card__image">
          <img
            alt={wine.name}
            className="card__picture"
            src={wine.imageUrl}
          />

          <button className="card__picture-like"></button>
        </div>

        <div className="card__info">
          <div className="card__name">
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

            <button className="card__shipping-button">
              <div className="card__shipping-icon"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
