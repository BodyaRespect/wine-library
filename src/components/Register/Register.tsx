import { useState } from 'react'

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true)

  const handleChange = (e: { target: { name: any, value: any } }) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    const newErrors = { ...errors }

    switch (name) {
      case 'firstName':
        if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
          newErrors.firstName
            = 'Firstname must start with a capital letter and contain only letters.'
        }
        else {
          newErrors.firstName = ''
        }
        break

      case 'lastName':
        if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
          newErrors.lastName
            = 'Last name must start with a capital letter and contain only letters.'
        }
        else {
          newErrors.lastName = ''
        }
        break

      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email address is invalid.'
        }
        else {
          newErrors.email = ''
        }
        break

      case 'password':
        if (
          !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(value)
        ) {
          newErrors.password
            = 'Password must be at least 8 characters long, contain uppercase, lowercase, numbers, and special characters.'
        }
        else {
          newErrors.password = ''
        }

        if (formData.repeatPassword && formData.repeatPassword !== value) {
          newErrors.repeatPassword = 'Passwords do not match.'
        }
        else {
          newErrors.repeatPassword = ''
        }
        break

      case 'repeatPassword':
        if (formData.password !== value) {
          newErrors.repeatPassword = 'Passwords do not match.'
        }
        else {
          newErrors.repeatPassword = ''
        }
        break

      default:
        break
    }

    setErrors(newErrors)

    if (['firstName', 'lastName', 'email'].includes(name)) {
      setIsNextButtonDisabled(
        !(
          formData.firstName
          && formData.lastName
          && formData.email
          && /^[A-Z][a-zA-Z]*$/.test(formData.firstName)
          && /^[A-Z][a-zA-Z]*$/.test(formData.lastName)
          && /\S+@\S+\.\S+/.test(formData.email)
        ),
      )
    }
  }

  const handleNext = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setShowPasswordFields(true)
    setIsNextButtonDisabled(true)
  }

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    console.log('Registration Data:', formData)
  }

  return (
    <div className="registration-container">
      <h2>Registration</h2>

      <p>We are glad to see you again in our wine community</p>

      <form onSubmit={handleRegister}>
        <label htmlFor="firstName">First name</label>
        <input
          autoComplete="off"
          name="firstName"
          onChange={handleChange}
          type="text"
          value={formData.firstName}
          required
        />
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}

        <label htmlFor="lastName">Last name</label>
        <input
          autoComplete="off"
          name="lastName"
          onChange={handleChange}
          type="text"
          value={formData.lastName}
          required
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}

        <label htmlFor="email">Email address</label>
        <input
          autoComplete="off"
          name="email"
          onChange={handleChange}
          type="email"
          value={formData.email}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        {showPasswordFields
          ? (
            <>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                value={formData.password}
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}

              <label htmlFor="repeatPassword">Repeat password</label>
              <input
                name="repeatPassword"
                onChange={handleChange}
                type="password"
                value={formData.repeatPassword}
                required
              />
              {errors.repeatPassword && <p className="error-message">{errors.repeatPassword}</p>}
            </>
            )
          : (
            <p className="consent">
              By clicking the "Next" button, you confirm your consent to the
              transfer of personal data
              <br />
              and confirm that you have read our privacy policy.
            </p>
            )}

        <button
          disabled={isNextButtonDisabled}
          onClick={!showPasswordFields ? handleNext : undefined}
          type="submit"
        >
          {showPasswordFields ? 'Register' : 'Next'}
        </button>
      </form>
    </div>
  )
}
