import { NavBar } from '@/components/Navbar'
import { NotFound as PageNotFound } from '@/pages/NotFound'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { fetchCartItems, fetchFavorites, fetchWines } from './api/axiosClient'
import { History } from './components/History'
import Login from './components/Oauth/Oauth'
import { Profile } from './components/Profile'
import { Register } from './components/Register/Register'
import { About } from './pages/About/About'
import { CartPage } from './pages/CartPage/CartPage'
import { Home } from './pages/Home'
import { LikedPage } from './pages/LikedPage'
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
          <Route element={<Home />} path="/home" index />
          <Route element={<About />} path="/about" index />
          <Route element={<History />} path="/history" index />
          <Route element={<SelectionPage />} path="/selection" index />
          <Route element={<Profile />} path="/profile" index />
          <Route element={<LikedPage />} path="/favorites" index />
          <Route element={<CartPage />} path="/cart" index />
          <Route element={<ProductDetails />} path="/productdetails/:id" />
          <Route element={<Register />} path="/register" index />
          <Route element={<Login />} path="/" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </main>

    </div>
  )
}

export default App
