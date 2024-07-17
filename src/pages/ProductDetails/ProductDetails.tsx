import type { Wine } from '@/types/Wine'

import { Characteristic } from '@/components/Characteristic'
import { Comment } from '@/components/Comment/Comment'
import { ProductList } from '@/components/ProductList/ProductList'
import { renderStars } from '@/components/Stars/Stars'
import { useAppSelector } from '@/store/hooks'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import delivery from '/images/delivery_boy.png'

export const ProductDetails: React.FC = () => {
  const { id = '0' } = useParams<{ id: string }>()

  const [wineData, setWineData] = useState<Wine | null>(null)
  const [rate, setRate] = useState(0)
  const [activeSection, setActiveSection] = useState('Description')
  const [showFullDescription, setShowFullDescription] = useState(false)

  const sections = ['Description', 'Characteristics', 'Comments']

  const wines = useAppSelector(state => state.products.products)
  const start = parseInt(id)
  const end = (parseInt(id) + 4) % wines.length

  const slicedWines = start < end
    ? wines.slice(start, end)
    : [...wines.slice(start), ...wines.slice(0, end)]

  useEffect(() => {
    axios.get(`http://api.winelibrary.wuaze.com/wines/${id}`)
      .then(response => setWineData(response.data))
      .catch(error => console.error('Error fetching wine data:', error))
  }, [id])

  useEffect(() => {
    axios.get(`http://api.winelibrary.wuaze.com/wines/${id}/ratings`)
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

  console.log(+id % wines.length + 4)

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
                <button className="details__like"></button>

                <button className="details__buy">
                  Add to cart
                  <div className="details__buy__icon"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

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

                  <button className="delivery__offer-container-button">Register</button>
                </div>

                <img
                  alt="deliveryImage"
                  className="delivery__offer-container-image"
                  src={delivery}
                />

                <button className="delivery__offer-container-image-button"></button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <ProductList column={4} wines={slicedWines} />
        </div>
      </div>
    </>
  )
}
