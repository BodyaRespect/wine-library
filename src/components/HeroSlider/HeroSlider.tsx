import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

export interface Slide {
  id: number
  image: string
  title: string
  description?: string
}

interface Props {
  slides: Slide[]
}

export const HeroSlider = ({ slides }: Props) => {
  const swiperElRef = useRef(null)

  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (!swiperElRef.current) {
      return
    }

    new Swiper(swiperElRef.current, {
      modules: [Pagination, EffectFade, Autoplay],
      allowTouchMove: false,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      effect: 'fade',
      autoplay: {
        delay: 7000,
      },
    })
  }, [])

  return (
    <div className="swiper hero-slider" ref={swiperElRef}>
      <div className="swiper-wrapper">
        {slides.map(({ id, image, title, description }) => (
          <div
            className="swiper-slide hero-slider__item"
            key={id}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="container hero-slider__content">
              <h1 className="hero-slider__title">{title}</h1>
              {description && <p className="hero-slider__description">{description}</p>}
              <button className="btn btn-arrow hero-slider__action" onClick={scrollDown}>
                <b>Scroll down</b>
                {' to choose your drink'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="hero-slider__pagination">
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  )
}
