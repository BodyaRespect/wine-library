import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { fetchCartItems, fetchFavorites, fetchWines } from './api/axiosClient'
import { History } from './components/History'
import { NavBar } from './components/Navbar'
import Login from './components/Oauth/Oauth'
import { Profile } from './components/Profile'
import { Register } from './components/Register/Register'
import { About } from './pages/About/About'
import { CartPage } from './pages/CartPage/CartPage'
import { Home } from './pages/Home'
import { LikedPage } from './pages/LikedPage'
import { NotFound as PageNotFound } from './pages/NotFound'
import { ProductDetails } from './pages/ProductDetails/ProductDetails'
import { SelectionPage } from './pages/Selection/Selection'
import { useAppDispatch } from './store/hooks'
import { setCartItems, setFavorites, setProducts } from './store/reducers/products'

import './App.scss'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchWines()
      .then(response => dispatch(setProducts(response.data)))
      .catch(error => console.error('Error fetching wine data for catalog:', error))
  }, [dispatch])

  useEffect(() => {
    fetchFavorites()
      .then(response => dispatch(setFavorites(response.data)))
      .catch(error => console.error('Error fetching favorite data:', error))
  }, [dispatch])

  useEffect(() => {
    fetchCartItems()
      .then(response => dispatch(setCartItems(response.data)))
      .catch(error => console.error('Error fetching cart data:', error))
  }, [dispatch])

  return (
    <div className="App">
      <NavBar />

      <main className="main">
        <Routes>
          <Route element={<Home />} path="wine-library/home" index />
          <Route element={<About />} path="wine-library/about" index />
          <Route element={<History />} path="wine-library/history" index />
          <Route element={<SelectionPage />} path="wine-library/selection" index />
          <Route element={<Profile />} path="wine-library/profile" index />
          <Route element={<LikedPage />} path="wine-library/favorites" index />
          <Route element={<CartPage />} path="wine-library/cart" index />
          <Route element={<ProductDetails />} path="wine-library/productdetails/:id" />
          <Route element={<Register />} path="wine-library/register" index />
          <Route element={<Login />} path="wine-library/login" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </main>

    </div>
  )
}

export default App