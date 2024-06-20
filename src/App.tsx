import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/Navbar'
import { NotFound as PageNotFound } from '@/pages/NotFound'
import { Route, Routes } from 'react-router-dom'

import { ProductDetails } from './pages/ProductDetails/ProductDetails'

import './App.scss'

function App() {
  return (
    <div className="App">
      <NavBar />

      <main className="main">
        <Routes>
          <Route path="/">
            <Route element={<ProductDetails id={1} />} index />
            <Route element={<PageNotFound />} path="*" />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
