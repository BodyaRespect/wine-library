import { Menu } from '@/components/Menu'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

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

export const Footer = () => {
  const [viewport, setViewport] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setViewport(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      {viewport > 660
        ? (
          <nav className="nav-bar">
            <div className="nav-bar__left-group">
              <Link className="nav-bar__logo" to="/" />

              <ul className="nav-bar__links">
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
                  Snack & Trinkets
                </NavLink>
              </ul>

              <ul className="nav-bar__right-group">
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
              </ul>
            </div>
          </nav>
          )
        : (
          <Menu />
          )}
    </>
  )
}
