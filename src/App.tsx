import { Login } from './components/Login'
import { NavBar } from './components/Navbar'

import './App.scss'

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>

      <main className="main">
        <Login />
      </main>

      <footer className="footer footer-fixed"></footer>
    </div>
  )
}

export default App
