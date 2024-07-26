import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import type { Wine } from '../../types/Wine'

import { accessToken, addToCartServer, addToFavorite, deleteFromFavorite, fetchWineData, fetchWineRatings, removeFromCartServer } from '../../api/axiosClient'
import { Characteristic } from '../../components/Characteristic'
import { Comment } from '../../components/Comment/Comment'
import { Footer } from '../../components/Footer'
import { ProductList } from '../../components/ProductList/ProductList'
import { renderStars } from '../../components/Stars/Stars'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addFavorite, addToCart, removeFavorite, removeFromCart } from '../../store/reducers/products'

import delivery from '/images/delivery_boy.png'

export const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id = '0' } = useParams<{ id: string }>()
  const [wineData, setWineData] = useState<Wine>()
  const [rate, setRate] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('Description')
  const [showFullDescription, setShowFullDescription] = useState(false)

  const sections = ['Description', 'Characteristics', 'Comments']

  const wines = useAppSelector(state => state.products.products)
  const isFavorite = useAppSelector(state => state.products.favorites.map(item => item.wineId)).includes(+id)
  const isCart = useAppSelector(state => state.products.cart.cartItems.map(item => item.wineId)).includes(+id)
  const start = parseInt(id)
  const end = (parseInt(id) + 4) % wines.length

  const slicedWines = start < end
    ? wines.slice(start, end)
    : [...wines.slice(start), ...wines.slice(0, end)]

  const handleToggleCart = () => {
    if (isCart) {
      dispatch(removeFromCart(+id))
      removeFromCartServer(+id)
    }
    else {
      dispatch(addToCart({ wineId: +id }))
      addToCartServer(+id)
    }
  }

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(+id))
      deleteFromFavorite(+id)
    }
    else {
      dispatch(addFavorite({ wineId: +id }))
      addToFavorite(+id)
      setRate(5)
    }
  }

  useEffect(() => {
    fetchWineData(+id)
      .then(response => setWineData(response.data))
      .catch(error => console.error('Error fetching wine data:', error))
  }, [id])

  useEffect(() => {
    fetchWineRatings(+id)
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
  }, [id])

  if (!wineData) {
    return
  }

  const descriptionText = showFullDescription || wineData.description.length <= 550
    ? wineData.description
    : `${wineData.description.slice(0, 550)}...`

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription)
  }

  return (
    <>
      <div className="product-container">
        <div className="container">
          <div className="details">
            <div className="details__image">
              <img
                alt={wineData.name}
                className="details__picture"
                src={wineData.imageUrl}
              />
            </div>

            <div className="details__info">
              <div className="details__title">
                {wineData.name}
              </div>

              <div className="stars">
                {renderStars(rate)}
              </div>

              <div className="details__info-sections">
                {sections.map(section => (
                  <button
                    className={`details__info-sections-${section.toLowerCase()} ${activeSection === section ? 'is-active' : ''}`}
                    key={section}
                    onClick={() => setActiveSection(section)}
                  >
                    {section}
                    {section === 'Comments' && <p className="details__info-sections-comments-count">12</p>}
                  </button>
                ))}
              </div>

              <div className="details__info-line"></div>

              {activeSection === 'Characteristics' && (
                <div className="characterisctics">
                  <Characteristic text={wineData.trademark} title="Trademark" />
                  <Characteristic text={wineData.wineType} title="Wine type" />
                  <Characteristic text={`${wineData.alcoholContent}%`} title="Alcohol content" />
                  <Characteristic text={wineData.year} title="Vintage" />
                  <Characteristic text={`${wineData.acidity}`} title="Acidity" />
                  <Characteristic
                    text={(
                      <div className="characterisctics__item">
                        <span className="characterisctics__text-flag" style={{ backgroundImage: `url(${wineData.countryFlagUrl})` }}></span>
                        {wineData.country}
                      </div>
                    )}
                    title="Geography"
                  />
                  <Characteristic text={wineData.sweetness} title="Sweetness" />
                  <Characteristic
                    text={(
                      <>
                        {wineData.recommendedFood.map((food, index) => (
                          <div className="characterisctics__item" key={index}>
                            <span className="characterisctics__text-food" style={{ backgroundImage: `url(${food.imageUrl})` }}></span>
                            {food.name}
                          </div>
                        ))}
                      </>
                    )}
                    title="Recommended Food"
                  />
                </div>
              )}

              {activeSection === 'Description' && (
                <div className="description">
                  <p className="description__text">
                    {descriptionText}
                  </p>

                  {wineData.description.length > 550 && (
                    <button className="description__readmore" onClick={handleReadMoreClick}>
                      {showFullDescription ? 'Show less' : 'Read more'}
                      <div className={`description__readmore-${showFullDescription ? 'up' : 'down'}`}></div>
                    </button>
                  )}
                </div>
              )}

              {activeSection === 'Comments' && (
                <div className="comments">
                  <Comment id={id} />
                </div>
              )}
            </div>

            <div className="details__order">
              <div className="details__price">
                {wineData.price}
                $
              </div>

              <div className="details__buttons">
                <button
                  className={`details__${isFavorite ? 'liked' : 'like'}`}
                  onClick={handleToggleFavorite}
                >
                </button>

                <button
                  className={`details__${isCart ? 'bought' : 'buy'}`}
                  onClick={handleToggleCart}
                >
                  {`${isCart ? 'In the Cart' : 'Add to Cart'}`}
                  <div className="details__buy__icon"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {!accessToken() && isOpen
          ? (
            <div className="container">
              <div className="delivery">
                <div className="delivery__offer">
                  <div className="delivery__offer-container">
                    <div className="delivery__offer-container-info">
                      <div className="delivery__offer-container-icon"></div>

                      <div className="delivery__offer-container-text">
                        When you register, you get
                        <br />
                        free delivery on your first order!
                      </div>

                      <button className="delivery__offer-container-button" onClick={() => navigate('/wine-library/register')}>Register</button>
                    </div>

                    <img
                      alt="deliveryImage"
                      className="delivery__offer-container-image"
                      src={delivery}
                    />

                    <button className="delivery__offer-container-image-button" onClick={() => setIsOpen(false)}></button>
                  </div>
                </div>
              </div>
            </div>
            )
          : (
            <div className="container">
              <div className="delivery__image"></div>
            </div>
            )}

        <div className="container">
          <h3 className="alsolike">You might also like</h3>
          <ProductList column={4} wines={slicedWines} />
        </div>
      </div>

      <Footer />
    </>
  )
}
