import wineImage from '/images/wine_tamplate.png'

export const CartItem = () => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__image">
          <img
            alt="IMacPhoto"
            className="card__picture"
            src={wineImage}
          />
        </div>

        <div className="card__info">
          <div className="card__name">
            Sauvignon Blanc
            <br />
            Marlborough Sun, 750ml.
          </div>

          <div className="card__country">
            <div className="card__country-flag"></div>
            <div className="card__country-name">Italy / Canti</div>
          </div>

          <div className="card__estimates">
            <div className="stars stars--4">
              <span className="stars__star"></span>
              <span className="stars__star"></span>
              <span className="stars__star"></span>
              <span className="stars__star--half"></span>
              <span className="stars__star"></span>
            </div>

            <div className="card__comments">
              <span className="card__comments-icon"></span>
              <div className="card__comments-count">50</div>
            </div>
          </div>

          <div className="card__shipping">
            <p className="card__shipping-price">990₴</p>
            <button className="card__shipping-button">
              <div className="card__shipping-icon"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
