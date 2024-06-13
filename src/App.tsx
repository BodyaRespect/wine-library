import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/Navbar'
import { Home as PageHome } from '@/pages/Home'
import { NotFound as PageNotFound } from '@/pages/NotFound'
import { Route, Routes } from 'react-router-dom'

import './App.scss'

function App() {
  return (
    <div className="App">
      <NavBar />

      <main className="main">
        <Routes>
          <Route path="/">
            <Route element={<PageHome />} index />
            <Route element={<PageNotFound />} path="*" />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
