import { NavBar } from '@/components/Navbar'
import { NotFound as PageNotFound } from '@/pages/NotFound'
import { Route, Routes } from 'react-router-dom'

import { ProductDetails } from './pages/ProductDetails/ProductDetails'
import { SelectionPage } from './pages/Selection/Selection'

import './App.scss'

function App() {
  return (
    <div className="App">
      <NavBar />

      <main className="main">
        <Routes>
          <Route path="/">
            <Route element={<ProductDetails id={39} />} index />
            <Route element={<PageNotFound />} path="*" />
          </Route>
          <Route path="/selection">
            <Route element={<SelectionPage />} index />
          </Route>
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  )
}

export default App
