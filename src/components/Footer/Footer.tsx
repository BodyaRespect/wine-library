import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h1 className="footer__title">
          Become a part
          <br />
          {' '}
          of our wine family!
        </h1>

        <p className="footer__text">
          At our store, we believe every bottle of wine tells a story.
          <br />
          {' '}
          It's art, culture, and tradition passed down through generations.
          <br />
          {' '}
          Wine unites people, creates memories, and inspires new discoveries.
          <br />
          {' '}
          We carefully select only the finest wines so you can enjoy their unique flavors and aromas.
          <br />
          {' '}
          Join our wine community and discover the true essence of wine culture.
        </p>

        <div className="footer__content-bottom">
          <div className="footer__contact-group">
            <a className="footer__contact-group-link" href="tel:+380664357155">+38 066 435 71 55</a>
            <a className="footer__contact-group-link" href="mailto:winelibrary@gmail.com">winelibrary@gmail.com</a>
          </div>

          <div className="footer__links-group">
            <div className="footer__right-group">
              <Link className="footer__link" to="/">Home</Link>
              <Link className="footer__link" to="/about-us">About us</Link>
            </div>

            <div className="footer__left-group">
              <Link className="footer__link" to="/selection">Selection</Link>
              <Link className="footer__link" to="/production">Production</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
