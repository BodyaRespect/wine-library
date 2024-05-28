import cn from 'classnames'
import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const getActiveLink = ({ isActive }: { isActive: boolean }) => {
  return cn('menu__link', {
    'selected-link': isActive,
  })
}

const getActiveTab = ({ isActive }: { isActive: boolean }) => {
  return cn('menu__icon', {
    'selected-tab': isActive,
  })
}

export const Menu = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [])

  return (
    <nav className="menu">
      <div className="menu__top">
        <Link className="menu__logo" to="/" />

        <Link className="menu__close" to="/" />
      </div>

      <ul className="menu__links">
        <NavLink className={getActiveLink} to="/">
          About us
        </NavLink>
        <NavLink className={getActiveLink} to="/production">
          Production
        </NavLink>
        <NavLink className={getActiveLink} to="/selection">
          Selection
        </NavLink>
        <NavLink className={getActiveLink} to="/products">
          All Products
        </NavLink>
      </ul>

      <div className="menu__icons">
        <NavLink className={getActiveTab} to="/search">
          <div className="nav-bar__search icon"></div>
        </NavLink>

        <NavLink className={getActiveTab} to="/profile">
          <div className="nav-bar__profile icon"></div>
        </NavLink>

        <NavLink className={getActiveTab} to="/favorites">
          <div className="nav-bar__favorite icon">
            <div className="nav-bar__icon-text">1</div>
          </div>
        </NavLink>

        <NavLink className={getActiveTab} to="/cart">
          <div className="nav-bar__cart icon">
            <div className="nav-bar__icon-text">2</div>
          </div>
        </NavLink>
      </div>
    </nav>
  )
}
