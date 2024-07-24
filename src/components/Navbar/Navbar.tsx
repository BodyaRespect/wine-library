import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'

const getActiveLink = ({ isActive }: { isActive: boolean }) => {
  return cn('nav-bar__link', {
    'selected-link': isActive,
  })
}

const getActiveTab = ({ isActive }: { isActive: boolean }) => {
  return cn('nav-bar__icon', {
    'selected-tab': isActive,
  })
}

export const NavBar = () => {
  const [isFavoriteCounterVisible, setIsFavoriteCounterVisible] = useState(false)
  const [isCartCounterVisible, setIsCartCounterVisible] = useState(false)

  const favoritesCounter = useAppSelector(state => state.products.favorites.length)
  const cartCounter = useAppSelector(state => state.products.cart.cartItems.length)

  useEffect(() => {
    favoritesCounter > 0 ? setIsFavoriteCounterVisible(true) : setIsFavoriteCounterVisible(false)
    cartCounter > 0 ? setIsCartCounterVisible(true) : setIsCartCounterVisible(false)
  }, [favoritesCounter, cartCounter])

  return (
    <header className="header">
      <div className="container">
        <nav className="nav-bar">
          <div className="nav-bar__left-group">
            <Link className="nav-bar__logo" to="/home" />

            <ul className="nav-bar__links">
              <NavLink className={getActiveLink} to="/about">
                About us
              </NavLink>
              <NavLink className={getActiveLink} to="/history">
                Order History
              </NavLink>
              <NavLink className={getActiveLink} to="/selection">
                Selection
              </NavLink>
            </ul>

            <ul className="nav-bar__right-group">
              <NavLink className={getActiveTab} to="/profile">
                <div className="nav-bar__profile icon"></div>
              </NavLink>

              <NavLink className={getActiveTab} to="/favorites">
                <div className="nav-bar__favorite icon">
                  {isFavoriteCounterVisible && (<div className="nav-bar__icon-text">{favoritesCounter}</div>)}
                </div>
              </NavLink>

              <NavLink className={getActiveTab} to="/cart">
                <div className="nav-bar__cart icon">
                  {isCartCounterVisible && (<div className="nav-bar__icon-text">{cartCounter}</div>)}
                </div>
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
