import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login, register } from '../../store/reducers/authentification'

export const Register = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatedPassword: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatedPassword: '',
  })

  const handleChange = (e: { target: { name: string, value: string } }) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    const newErrors = { ...errors }

    switch (name) {
      case 'firstName':
        if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
          newErrors.firstName = 'First name must start with a capital letter and contain only letters.'
        }
        else {
          newErrors.firstName = ''
        }
        break

      case 'lastName':
        if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
          newErrors.lastName = 'Last name must start with a capital letter and contain only letters.'
        }
        else {
          newErrors.lastName = ''
        }
        break

      case 'email':
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          newErrors.email = 'Email address is invalid.'
        }
        else if (value.includes('..')) {
          newErrors.email = 'Email address cannot contain consecutive dots.'
        }
        else if (value.trim() !== value) {
          newErrors.email = 'Email address cannot start or end with whitespace.'
        }
        else {
          newErrors.email = ''
        }
        break

      case 'password':
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(value)) {
          newErrors.password = 'Password must be at least 8 characters long, contain uppercase, lowercase, numbers, and special characters.'
        }
        else {
          newErrors.password = ''
        }
        if (formData.repeatedPassword && formData.repeatedPassword !== value) {
          newErrors.repeatedPassword = 'Passwords do not match.'
        }
        else {
          newErrors.repeatedPassword = ''
        }
        break

      case 'repeatedPassword':
        if (formData.password !== value) {
          newErrors.repeatedPassword = 'Passwords do not match.'
        }
        else {
          newErrors.repeatedPassword = ''
        }
        break

      default:
        break
    }

    setErrors(newErrors)

    if (['firstName', 'lastName', 'email'].includes(name)) {
      setIsNextButtonDisabled(
        !(formData.firstName && formData.lastName && formData.email
        && /^[A-Z][a-zA-Z]*$/.test(formData.firstName)
        && /^[A-Z][a-zA-Z]*$/.test(formData.lastName)
        && /\S+@\S+\.\S+/.test(formData.email)),
      )
    }
  }

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setShowPasswordFields(true)
    setIsNextButtonDisabled(true)
  }

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const resultAction = await dispatch(register(formData))
    console.log(resultAction)

    if (register.fulfilled.match(resultAction)) {
      try {
        const loginResult = await dispatch(login(formData)).unwrap()

        const { token } = loginResult
        Cookies.set('accessToken', token)

        // Redirect to /profile after successful login
        navigate('/profile')
      }
      catch (err) {
        console.error('Failed to login:', err)
      }
    }
    else {
      console.error('Failed to register:', resultAction.payload)
    }
  }

  return (
    <div className="registration-container">
      <h2>Registration</h2>

      <p>We are glad to see you again in our wine community</p>

      <form onSubmit={handleRegister}>
        <label htmlFor="firstName">
          First name
          <input
            autoComplete="off"
            name="firstName"
            onChange={handleChange}
            type="text"
            value={formData.firstName}
            required
          />
        </label>

        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

        <label htmlFor="lastName">
          Last name
          <input
            autoComplete="off"
            name="lastName"
            onChange={handleChange}
            type="text"
            value={formData.lastName}
            required
          />
        </label>

        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

        <label htmlFor="email">
          Email address
          <input
            autoComplete="off"
            name="email"
            onChange={handleChange}
            type="email"
            value={formData.email}
            required
          />
        </label>

        {errors.email && <p className="error-message">{errors.email}</p>}

        {showPasswordFields
          ? (
            <>
              <label htmlFor="password">
                Password
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formData.password}
                  required
                />
              </label>

              {errors.password && <p className="error-message">{errors.password}</p>}

              <label htmlFor="repeatPassword">
                Repeat password
                <input
                  name="repeatedPassword"
                  onChange={handleChange}
                  type="password"
                  value={formData.repeatedPassword}
                  required
                />
              </label>

              {errors.repeatedPassword && <p className="error-message">{errors.repeatedPassword}</p>}
            </>
            )
          : (
            <p className="consent">
              By clicking the "Next" button, you confirm your consent to the transfer of personal data
              and confirm that you have read our privacy policy.
            </p>
            )}

        {!showPasswordFields
          ? (
            <button
              disabled={isNextButtonDisabled}
              onClick={handleNext}
              type="submit"
            >
              Next
            </button>
            )
          : (
            <button
              disabled={loading}
              type="submit"
            >
              Register
            </button>
            )}
      </form>
    </div>
  )
}
