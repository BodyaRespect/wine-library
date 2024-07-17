import wineImg10 from '/images/carousel1.png'
import wineImg9 from '/images/carousel2.png'
import wineImg8 from '/images/carousel3.png'
import wineImg7 from '/images/carousel4.png'
import wineImg6 from '/images/carousel5.png'
import wineImg5 from '/images/carousel6.png'
import wineImg4 from '/images/carousel7.png'
import wineImg3 from '/images/carousel8.png'
import wineImg2 from '/images/carousel9.png'
import wineImg1 from '/images/carousel10.png'

const winePartners = [
  { id: 1, name: 'Mucho Más', logo: wineImg1 },
  { id: 2, name: 'Château Margaux', logo: wineImg2 },
  { id: 3, name: 'Barolo', logo: wineImg3 },
  { id: 4, name: 'Penfolds', logo: wineImg4 },
  { id: 5, name: 'Cloudy Bay', logo: wineImg5 },
  { id: 6, name: 'Cloudy Bay', logo: wineImg6 },
  { id: 7, name: 'Cloudy Bay', logo: wineImg7 },
  { id: 8, name: 'Cloudy Bay', logo: wineImg8 },
  { id: 9, name: 'Cloudy Bay', logo: wineImg9 },
  { id: 10, name: 'Cloudy Bay', logo: wineImg10 },
]

const WineCarousel = () => {
  return (
    <div className="wine-carousel">
      <div className="wine-carousel__slider">
        <div className="wine-carousel__slides">
          {winePartners.concat(winePartners).map((partner, index) => (
            <div className="wine-carousel__slide" key={index}>
              <img alt={partner.name} src={partner.logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WineCarousel
