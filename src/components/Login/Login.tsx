import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login } from '../../store/reducers/authentification'
import Ouath from '../Oauth/Oauth'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(state => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    try {
      const loginResult = await dispatch(login({ email, password })).unwrap()

      const { token } = loginResult
      Cookies.set('accessToken', token)
    }
    catch (err) {
      console.error('Failed to login:', err)
    }
  }

  return (
    <div className="login-container">
      <h2>Log In</h2>

      <p>We are glad to see you again in our wine community</p>

      <Ouath />

      <div className="login-container-or">or</div>

      {error && <span className="error">{error}</span>}

      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          value={email}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          type="password"
          value={password}
          required
        />

        <p className="consent">
          By clicking the "Log In" button, you confirm your consent to the
          transfer of personal data
          <br />
          and confirm that you have read our privacy
          policy.
        </p>

        <div className="login-container-buttons">
          <button
            className="login-container-login"
            disabled={loading}
            type="submit"
          >
            Log In
          </button>

          <button
            className="login-container-register"
            disabled={loading}
            onClick={() => navigate('/register')}
            type="button"
          >
            I don`t have an account
          </button>
        </div>
      </form>
    </div>
  )
}
