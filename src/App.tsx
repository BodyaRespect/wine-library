import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    fetchWines()
      .then((response) => {
        dispatch(setProducts(response.data))
      })
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

  useEffect(() => {
    const hash = window.location.hash
    const token = new URLSearchParams(hash.substring(1)).get('access_token')
    console.log(token)

    if (token) {
      axios.post('http://165.227.169.19:5173/auth/oauth/sign-in', { googleClientIdToken: token })
        .then((response) => {
          const { token: newAccessToken } = response.data
          Cookies.set('accessToken', newAccessToken)
          navigate('/')
        })
        .catch((error) => {
          console.error('Error during the API call:', error)
          console.log('Error details:', error.toJSON())
        })
    }
  }, [])

  return (
    <div className="App">
      <NavBar />

      <main className="main">
        <Routes>
          <Route element={<Home />} path="/" index />
          <Route element={<About />} path="/about" index />
          <Route element={<History />} path="/history" index />
          <Route element={<SelectionPage />} path="/selection" index />
          <Route element={<Profile />} path="/profile" index />
          <Route element={<LikedPage />} path="/favorites" index />
          <Route element={<CartPage />} path="/cart" index />
          <Route element={<ProductDetails />} path="/productdetails/:id" />
          <Route element={<Register />} path="/register" index />
          <Route element={<Login />} path="/login" />
          <Route element={<PageNotFound />} path="*" />
        </Routes>
      </main>

    </div>
  )
}

export default App
