import type { MouseEvent } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Login } from '../../components/Login'

export const Profile = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(Cookies.get('accessToken') || '')
  const [active, setActive] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://api.winelibrary.wuaze.com/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { firstName, lastName, email } = response.data

        setFirstName(firstName)
        setLastName(lastName)
        setEmail(email)
      }
      catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    if (token) {
      fetchUserProfile()
    }
  }, [token])

  useEffect(() => {
    const handleTokenChange = () => {
      const newToken = Cookies.get('accessToken') || ''
      setToken(newToken)
    }

    handleTokenChange()

    const interval = setInterval(handleTokenChange, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (token) {
      navigate('/wine-library/profile') // Перенаправлення на сторінку профілю
    }
  }, [token, navigate])

  const handlePasswordUpdate = async () => {
    const newErrors = { currentPassword: '', newPassword: '', repeatPassword: '' }

    if (newPassword === currentPassword) {
      newErrors.newPassword = 'The new password cannot be the same as the old one'
    }

    if (newPassword !== repeatPassword) {
      newErrors.repeatPassword = 'Password doesn\'t match'
    }

    setErrors(newErrors)

    if (!newErrors.currentPassword && !newErrors.newPassword && !newErrors.repeatPassword) {
      try {
        const response = await axios.put('https://api.winelibrary.wuaze.com/users/update-password', {
          currentPassword,
          password: newPassword,
          repeatedPassword: repeatPassword,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        console.log('Password updated successfully', response.data)
        setActive(false)
        setCurrentPassword('')
        setNewPassword('')
        setRepeatPassword('')
        setErrors({ currentPassword: '', newPassword: '', repeatPassword: '' })
      }
      catch (error) {
        console.error('Error updating password', error)
        setErrors({ ...newErrors, currentPassword: 'Failed to update password. Please try again.' })
      }
    }
  }

  const handleFirstNameUpdate = async () => {
    try {
      const response = await axios.patch('https://api.winelibrary.wuaze.com/users/me/update/first-name', {
        firstName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('First name updated successfully:', response.data)
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating first name:', error.message)
        console.error('Error details:', error.toJSON())
      }
      else {
        console.error('Unexpected error:', error)
      }
    }
  }

  const handleFirstNameUpdateClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    handleFirstNameUpdate()
  }

  const handleLastNameUpdate = async () => {
    try {
      const response = await axios.patch('https://api.winelibrary.wuaze.com/users/me/update/last-name', {
        lastName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Last name updated successfully:', response.data)
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating last name:', error.message)
        console.error('Error details:', error.toJSON())
      }
      else {
        console.error('Unexpected error:', error)
      }
    }
  }

  const handleLastNameUpdateClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    handleLastNameUpdate()
  }

  return (
    <div className="container">
      {token
        ? (
          <div className="profile">
            <div className="profile-container">
              <h2>Profile</h2>

              <form>
                <label htmlFor="firstname">First name</label>
                <div className="profile__field">
                  <input
                    id="firstname"
                    name="firstname"
                    onChange={event => setFirstName(event.target.value)}
                    placeholder="Enter your first name"
                    type="text"
                    value={firstName}
                    required
                  />

                  <button className="profile__field-icon" onClick={handleFirstNameUpdateClick}></button>
                </div>

                <label htmlFor="password">Last name</label>
                <div className="profile__field">
                  <input
                    id="lastname"
                    name="lastname"
                    onChange={event => setLastName(event.target.value)}
                    placeholder="Enter your last name"
                    type="text"
                    value={lastName}
                    required
                  />

                  <button className="profile__field-icon" onClick={handleLastNameUpdateClick}></button>
                </div>

                <label htmlFor="email">Email address</label>
                <div className="profile__field">
                  <input
                    id="email"
                    name="email"
                    onChange={event => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    required
                  />
                </div>

                <div className="profile__buttons">
                  <button
                    className="profile__button profile__buttons-update"
                    onClick={() => setActive(true)}
                    type="button"
                  >
                    Update Password
                  </button>

                  <button
                    onClick={() => {
                      Cookies.remove('accessToken')
                      setToken('')
                    }}
                    className="profile__button profile__buttons-logout"
                    type="button"
                  >
                    Log out
                  </button>
                </div>
              </form>

              <div className={active ? 'profile__modal profile__modal-active' : 'profile__modal'} onClick={() => setActive(false)}>
                <div className={active ? 'profile__modal-content profile__modal-content-active' : 'profile__modal-content'} onClick={e => e.stopPropagation()}>
                  <div className="profile__modal-field">
                    <label htmlFor="password">Enter your current password</label>
                    <input
                      id="password"
                      name="password"
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="Enter your password"
                      type="password"
                      value={currentPassword}
                      required
                    />

                    {errors.currentPassword && <span className="error">{errors.currentPassword}</span>}
                  </div>

                  <div className="profile__modal-field">
                    <label htmlFor="create_password">Create new password</label>
                    <input
                      id="create_password"
                      name="create_password"
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      type="password"
                      value={newPassword}
                      required
                    />

                    {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                  </div>

                  <div className="profile__modal-field">
                    <label htmlFor="repeat_password">Repeat new password</label>
                    <input
                      id="repeat_password"
                      name="repeat_password"
                      onChange={e => setRepeatPassword(e.target.value)}
                      placeholder="Repeat your password"
                      type="password"
                      value={repeatPassword}
                      required
                    />

                    {errors.repeatPassword && <span className="error">{errors.repeatPassword}</span>}
                  </div>

                  <button
                    className="profile__button profile__buttons-update"
                    onClick={handlePasswordUpdate}
                    type="button"
                  >
                    Save Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          )
        : (
          <Login />
          )}
    </div>
  )
}
