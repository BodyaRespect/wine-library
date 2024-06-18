// import { useState } from 'react'

import { Characteristic } from '@/components/Characteristic'

import wineImage from '/images/wine_tamplate.png'

export const ProductDetails = () => {
  // const [activeSection, setActiveSection] = useState('Characteristics')

  // const sections = ['Description', 'Characteristics', 'Comments']

  return (
    <div className="details">
      <div className="details__image">
        <img
          alt="wineImage"
          className="details__picture"
          src={wineImage}
        />
      </div>

      <div className="details__info">
        <div className="details__title">
          Wine Sauvignon Blanc Marlborough
          {'\n'}
          Sun White Dry 750 ml.
        </div>

        <div className="stars stars--4">
          <span className="stars__star"></span>
          <span className="stars__star"></span>
          <span className="stars__star"></span>
          <span className="stars__star--half"></span>
          <span className="stars__star"></span>

          <p className="stars__rating">3.5/5</p>
        </div>

        <div className="details__info-sections">
          <button className="details__info-sections-description">
            Description
          </button>

          <button className="details__info-sections-characteristics is-active">
            Characteristics
          </button>

          <button className="details__info-sections-comments">
            Comments
            <p className="details__info-sections-comments-count">12</p>
          </button>
        </div>

        <div className="details__info-line"></div>

        <div className="characterisctics">
          <div className="characterisctics__left">
            <Characteristic text="Marlborough Sun" title="Manufacturer" />
            <Characteristic text="Sauvignon Blanc" title="Varietal composition" />
            <Characteristic text="12.5%" title="Strength" />
          </div>

          <div className="characterisctics__right">
            <Characteristic text="2020" title="Vintage" />
            <Characteristic text="3.12 g / l" title="Sugar" />
            <Characteristic
              text={(
                <>
                  <div className="characterisctics__text-flag"></div>
                  Italy / Canti
                </>
              )}
              title="Geography"
            />
          </div>
        </div>
      </div>

      <div className="details__order">
        <div className="details__price">990₴</div>

        <div className="details__buttons">
          <button className="details__like"></button>

          <button className="details__buy">
            Add to cart
            <div className="details__buy__icon"></div>
          </button>
        </div>
      </div>
    </div>
  )
}
