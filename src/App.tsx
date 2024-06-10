import { NavBar } from './components/Navbar'
import { Register } from './components/Register/Register'

import './App.scss'

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />

      </header>

      <main className="main">
        <Register />
      </main>

      <footer className="footer footer-fixed"></footer>
    </div>
  )
}

export default App
