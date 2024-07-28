import { useNavigate } from 'react-router-dom'

import WineCarousel from '../../components/Carousel/Carousel'
import { Footer } from '../../components/Footer'

import firstImg from '/backgrounds/about-us-first.jpg'
import firstScroller from '/images/about_scroller_first.png'
import secondScroller from '/images/about_scroller_second.png'
import yarik from '/images/yarik.svg'

export const About = () => {
  const navigate = useNavigate()

  return (
    <div className="about">
      <div className="about-first about-block">
        <div className="about-first-info">
          <h2 className="about-first-info-title">
            We are Wine Library,
            <br />
            a platform that challenges
            <br />
            your wine experience.
          </h2>

          <p className="about-first-info-text">
            Our goal is to help you find the perfect wines that will make you passionate
            about the art of wine and open up new horizons of taste.
          </p>

          <button className="about-first-info-button" onClick={() => navigate('/')}>
            <div className="about-first-info-button-text">
              Click here
              <br />
              to choose your drink
            </div>

            <div className="about-first-info-button-icon">
            </div>
          </button>
        </div>

        <img className="about-first-image" src={firstImg} />
      </div>

      <div className="about-second about-block">
        <div className="about-second-info">
          <div className="about-second-info-top">
            <h2 className="about-second-info-title">
              We only work with trusted
              <br />
              suppliers, who meet our high quality standards.
            </h2>

            <p className="about-second-info-text">
              Our team carefully selects each partner to ensure you get the best wines from around the world. We always find the best for you.
            </p>
          </div>

          <div className="about-second-info-bottom">
            <h2 className="about-second-info-title">
              Our catalogue includes only
              <br />
              selected wines that have passed
              strict quality control.
            </h2>

            <p className="about-second-info-text">
              We ensure that each bottle meets the highest standards and brings pleasure from the first sip to the last drop.
            </p>
          </div>
        </div>
      </div>

      <div className="about-third about-block">
        <div className="about-third-info">
          <div className="about-third-top">
            <h2 className="about-first-info-title">
              Registration in our Wine Library
              <br />
              store is simple and fast.
            </h2>

            <p className="about-first-info-text">
              In just a few steps, you'll be able to add your favourite wines
              to your favourites list and receive personalised recommendations.
              And best of all, your first delivery will be on us.
              Join our community of wine connoisseurs and enjoy impeccable service.
            </p>

            <button className="about-first-info-button" onClick={() => navigate('/register')}>
              <div className="about-first-info-button-text">
                Click here
                <br />
                to register
              </div>

              <div className="about-first-info-button-icon">
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="about-fourth about-block">
        <div className="about-fourth-info">
          <div className="about-fourth-top">
            <h2 className="about-first-info-title">
              Yarik will find the perfect
              <br />
              wine for you
            </h2>

            <p className="about-first-info-text">
              Meet Yarik, our innovative artificial intelligence that matches wines to every request and taste.
              He analyses your preferences and suggests the perfect options to meet your wine needs.
              Thanks to his recommendations, you will always be one step ahead in the world of wine innovations.
            </p>

            <button className="about-first-info-button" onClick={() => navigate('/selection')}>
              <div className="about-first-info-button-text">
                Click here
                <br />
                to explore Yarik
              </div>

              <div className="about-first-info-button-icon">
              </div>
            </button>
          </div>
        </div>

        <img className="about-fourth-image" src={yarik} />
      </div>

      <div className="about-fifth about-block">
        <div className="about-fifth-info">
          <h2 className="about-fifth-info-title">
            We cooperate with leading wine producers and exporters.
          </h2>

          <p className="about-fifth-info-text">
            These companies are known for their dedication to quality and tradition,
            and we are delighted to have them among our partners.
          </p>
        </div>

        <WineCarousel />

        <div className="about-fifth-bottom">
          <div className="about-fifth-bottom-container">
            <h2 className="about-fifth-bottom-title">
              Join Wine Library today
            </h2>

            <p className="about-fifth-bottom-text">
              And discover a world of wines that goes beyond your expectations.
            </p>

            <button className="about-fifth-bottom-button" onClick={() => navigate('/register')}>
              <div className="about-fifth-bottom-button-text">
                Click here
                <br />
                for registration
              </div>

              <div className="about-fifth-bottom-button-icon">
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="about-sixth about-block">
        <div className="about-sixth-filters">
          <div className="about-sixth-box left">
            <img alt="Left Image" src={firstScroller} />
          </div>

          <div className="about-sixth-box right">
            <img alt="Right Image" src={secondScroller} />
          </div>
        </div>

        <div className="about-sixth-bottom">
          <div className="about-sixth-bottom-container">
            <h2 className="about-sixth-bottom-title">
              All the information and
              <br />
              filtering you need
            </h2>

            <p className="about-sixth-bottom-text">
              We provide all the information you need and convenient filters to help you find the right wine for every taste.
              Easily find the perfect wine with detailed descriptions, ratings and recommendations.
              Our filtering tools will help you quickly narrow down your selection by various parameters such as grape variety,
              region, price and more.
            </p>

            <button className="about-sixth-bottom-button" onClick={() => navigate('/')}>
              <div className="about-sixth-bottom-button-text">
                Click here
                <br />
                to choose your drink
              </div>

              <div className="about-sixth-bottom-button-icon"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="about-seventh about-block">

      </div>

      <div className="about-eighth about-block">
        <div className="about-eighth-info">
          <h2 className="about-eighth-info-title">
            We have been on the
            <br />
            market since 2001
          </h2>

          <p className="about-eighth-info-text">
            We have been on the market since 2001 and have gained
            thousands of satisfied customers over the years.
            Our many years of experience allow us to offer only the best.
            Trust our reputation and see for yourself.
          </p>
        </div>

        <div className="about-eighth-blocks">
          <div className="about-eighth-blocks-block">
            <h1 className="about-eighth-blocks-block-number">1000+</h1>

            satisfied customers
          </div>

          <div className="about-eighth-blocks-block">
            Since

            <h1 className="about-eighth-blocks-block-number">2001</h1>

            On the market
          </div>

          <div className="about-eighth-blocks-block">
            Cooperate with

            <h1 className="about-eighth-blocks-block-number">40+</h1>

            Global wineries
          </div>
        </div>
      </div>

      <div className="about-nineth about-block">
        <Footer />
      </div>
    </div>
  )
}
