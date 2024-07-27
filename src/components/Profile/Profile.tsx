import type { KeyboardEvent, MouseEvent } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Login } from '../../components/Login'
import { useAppSelector } from '../../store/hooks'
import { setEmail, setFirstName, setLastName } from '../../store/reducers/profile'

export const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [token, setToken] = useState(Cookies.get('accessToken') || '')
  const [active, setActive] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  })
  const [editState, setEditState] = useState({
    firstName: false,
    lastName: false,
  })

  const firstName = useAppSelector(state => state.profile.firstName)
  const lastName = useAppSelector(state => state.profile.lastName)
  const email = useAppSelector(state => state.profile.email)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://api.winelibrary.wuaze.com/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { firstName, lastName, email } = response.data

        dispatch(setFirstName(firstName))
        dispatch(setLastName(lastName))
        dispatch(setEmail(email))
      }
      catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    if (token) {
      fetchUserProfile()
    }
  }, [token, dispatch])

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
      navigate('/wine-library/profile')
    }
  }, [token, navigate])

  const handlePasswordUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
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

  const handleFirstNameUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response = await axios.patch('https://api.winelibrary.wuaze.com/users/me/update/first-name', {
        firstName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('First name updated successfully:', response.data)
      setEditState(prevState => ({ ...prevState, firstName: false })) // Disable editing
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

  const handleLastNameUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      const response = await axios.patch('https://api.winelibrary.wuaze.com/users/me/update/last-name', {
        lastName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('Last name updated successfully:', response.data)
      setEditState(prevState => ({ ...prevState, lastName: false })) // Disable editing
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

  const handleFirstNameEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setEditState(prevState => ({ ...prevState, firstName: true }))
  }

  const handleLastNameEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setEditState(prevState => ({ ...prevState, lastName: true }))
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>, fieldName: string) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (fieldName === 'firstName') {
        handleFirstNameUpdate(event as unknown as MouseEvent<HTMLButtonElement>)
      }
      else if (fieldName === 'lastName') {
        handleLastNameUpdate(event as unknown as MouseEvent<HTMLButtonElement>)
      }
    }
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
                    disabled={!editState.firstName}
                    id="firstname"
                    name="firstname"
                    onChange={event => dispatch(setFirstName(event.target.value))}
                    onKeyDown={event => handleKeyPress(event, 'firstName')}
                    placeholder="Enter your first name"
                    type="text"
                    value={firstName}
                    required
                  />

                  {editState.firstName
                    ? (
                      <button className="profile__field-approve" onClick={handleFirstNameUpdate}>
                        {/* Icon for confirmation */}
                      </button>
                      )
                    : (
                      <button className="profile__field-icon" onClick={handleFirstNameEditClick}>
                        {/* Icon for editing */}
                      </button>
                      )}
                </div>

                <label htmlFor="lastname">Last name</label>
                <div className="profile__field">
                  <input
                    disabled={!editState.lastName}
                    id="lastname"
                    name="lastname"
                    onChange={event => dispatch(setLastName(event.target.value))}
                    onKeyDown={event => handleKeyPress(event, 'lastName')}
                    placeholder="Enter your last name"
                    type="text"
                    value={lastName}
                    required
                  />

                  {editState.lastName
                    ? (
                      <button className="profile__field-approve" onClick={handleLastNameUpdate}>
                        {/* Icon for confirmation */}
                      </button>
                      )
                    : (
                      <button className="profile__field-icon" onClick={handleLastNameEditClick}>
                        {/* Icon for editing */}
                      </button>
                      )}
                </div>

                <label htmlFor="email">Email address</label>
                <div className="profile__field">
                  <input
                    disabled={true}
                    id="email"
                    name="email"
                    onChange={event => dispatch(setEmail(event.target.value))}
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
                  <form>
                    <label htmlFor="current-password">Current password</label>
                    <input
                      id="current-password"
                      name="current-password"
                      onChange={event => setCurrentPassword(event.target.value)}
                      placeholder="Enter your current password"
                      type="password"
                      value={currentPassword}
                      required
                    />
                    {errors.currentPassword && <p className="error">{errors.currentPassword}</p>}

                    <label htmlFor="new-password">New password</label>
                    <input
                      id="new-password"
                      name="new-password"
                      onChange={event => setNewPassword(event.target.value)}
                      placeholder="Enter your new password"
                      type="password"
                      value={newPassword}
                      required
                    />
                    {errors.newPassword && <p className="error">{errors.newPassword}</p>}

                    <label htmlFor="repeat-password">Repeat new password</label>
                    <input
                      id="repeat-password"
                      name="repeat-password"
                      onChange={event => setRepeatPassword(event.target.value)}
                      placeholder="Repeat your new password"
                      type="password"
                      value={repeatPassword}
                      required
                    />
                    {errors.repeatPassword && <p className="error">{errors.repeatPassword}</p>}

                    <button
                      className="profile__modal-button"
                      onClick={handlePasswordUpdate}
                      type="submit"
                    >
                      Update Password
                    </button>
                  </form>
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
