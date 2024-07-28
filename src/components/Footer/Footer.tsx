import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <h1 className="footer__title">
            Become a part of our wine family!
          </h1>

          <p className="footer__text">
            At our store, we believe every bottle of wine tells a story. It's art, culture, and tradition passed down through generations. Wine unites people, creates memories, and inspires new discoveries. We carefully select only the finest wines so you can enjoy their unique flavors and aromas. Join our wine community and discover the true essence of wine culture.
          </p>

          <div className="footer__bottom">
            <div className="footer__contact-group">
              <a className="footer__link" href="tel:+380664357155">+38 066 435 71 55</a>
              <a className="footer__link" href="mailto:winelibrary@gmail.com">winelibrary@gmail.com</a>
            </div>

            <div className="footer__links-group">
              <Link className="footer__link" to="/">Home</Link>
              <Link className="footer__link" to="/about">About us</Link>
              <Link className="footer__link" to="/selection">Selection</Link>
              <Link className="footer__link" to="/profile">Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
