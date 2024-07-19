import type { DeliveryType } from '@/types/DeliveryType'
import type { OrderDetails } from '@/validations/orderDetails'
import type { z } from 'zod'

import { createPayment, fetchCities, fetchPostOffices, placeOrder, sendVerification, verifyCode } from '@/api/axiosClient'
import { AutoCompleteDropdown } from '@/components/AutoDropdown'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { useAppSelector } from '@/store/hooks'
import { orderDetailsSchema } from '@/validations/orderDetails'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CartPage: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [cities, setCities] = useState<string[]>([])
  const [ukrPostOffices, setUkrPostOffices] = useState<string[]>([])
  const [novaPostOffices, setNovaPostOffices] = useState<string[]>([])
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>('')
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [shippingAddress, setShippingAddress] = useState<string>('')
  const [errors, setErrors]
    = useState<z.ZodFormattedError<OrderDetails, string>>()
  const [modal, setModal] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [confirmationCode, setConfirmationCode] = useState(['', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [timer, setTimer] = useState(0)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const wineIds = useAppSelector(state => state.products.cart.cartItems.map(item => item.wineId))
  const carts = useAppSelector(state => state.products.products.filter(wine => wineIds.includes(wine.id)))

  const deliveryCost: Record<DeliveryType, number> = {
    NOVA_POST_COURIER: 120,
    NOVA_POST_PICKUP: 100,
    UKR_POST_PICKUP: 60,
  }

  const costOfDelivery: number = deliveryCost[selectedDelivery as DeliveryType] || 0
  const totalAmount: number = carts.reduce((accumulator, wine) => accumulator + wine.price, 0)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target

    setSelectedDelivery(prevState => (prevState === id ? null : id))
  }

  const handleConfirmationCodeChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...confirmationCode]
      newCode[index] = value
      setConfirmationCode(newCode)

      if (value !== '' && index < confirmationCode.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !confirmationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target

    setSelectedPayment(prevState => (prevState === id ? null : id))
  }

  const removeError = (property: keyof OrderDetails) => {
    if (!errors) return

    const { [property]: _, ...newData } = errors

    setErrors(newData)
  }

  const handleConfirmOrder = () => {
    const orderDetails = {
      email,
      firstName,
      lastName,
      phoneNumber,
      city,
      shippingAddress,
      deliveryType: selectedDelivery,
      paymentType: selectedPayment,
    }

    const res = orderDetailsSchema.safeParse(orderDetails)

    if (res.error) {
      setErrors(res.error.format())
      return
    }
    else {
      setErrors(undefined)
    }

    console.log(orderDetails)

    placeOrder(orderDetails)
      .then((response) => {
        setOrderId(response.data.id)

        return sendVerification(phoneNumber)
          .then(() => {
            console.log('Phone number sent successfully!')
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              console.error('Network error:', error.message)
              console.error('Error details:', error.toJSON())
            }
            else {
              console.error('Unexpected error:', error)
            }
          })
      })
      .then(() => {
        console.log('Order placed successfully')
        setModal(true)
        console.log('Verification sent successfully')
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error('Network error:', error.message)
          console.error('Error details:', error.toJSON())
        }
        else {
          console.error('Unexpected error:', error)
        }
      })
  }

  const handleConfirm = () => {
    const code = confirmationCode.join('')

    console.log(code)

    verifyCode(orderId!, phoneNumber, code)
      .then((response) => {
        console.log('Verification successful:', response.data)
        setModal(false)

        return createPayment(orderId!)
          .then(() => {
            console.log('Payment created successfully!')
            setSuccess(true)
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              console.error('Network error:', error.message)
              console.error('Error details:', error.toJSON())
            }
            else {
              console.error('Unexpected error:', error)
            }
          })
      })
      .catch((error) => {
        console.error('Verification failed:', error)
      })
  }

  const handleResend = () => {
    sendVerification(phoneNumber)
      .then((response) => {
        console.log('Code resent:', response.data)
        setTimer(60)
        setIsCountingDown(true)
      })
      .catch((error) => {
        console.error('Failed to resend code:', error)
      })
  }

  useEffect(() => {
    fetchCities()
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching cities:', error))

    if (city) {
      fetchPostOffices(city)
        .then((response) => {
          setUkrPostOffices(response.data.ukrPostOffices.map((item: { name: string }) => item.name))
          setNovaPostOffices(response.data.novaPostOffices.map((item: { name: string }) => item.name))
        })
        .catch(error => console.error('Error fetching post offices:', error))
    }
  }, [city])

  useEffect(() => {
    if (isCountingDown) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown)
            setIsCountingDown(false)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)

      return () => clearInterval(countdown)
    }
  }, [isCountingDown])

  return (
    <div className="container">
      <div className="cart">
        <div className="cart__content">
          <div className="cart__content-container">
            <div className="cart__title">
              <div className="cart__title--icon"></div>
              Customer Data
            </div>

            <div className="cart__customer">
              <div className="cart__customer-field">
                <label htmlFor="email">Email</label>

                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)}
                  id="email"
                  name="email"
                  onClick={() => removeError('email')}
                  type="email"
                  required
                />

                {errors?.email?._errors.at(0) && (
                  <span className="cart__error">
                    {errors?.email?._errors.at(0)}
                  </span>
                )}
              </div>

              <div className="cart__customer-field">
                <label htmlFor="phone">Phone number</label>

                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPhoneNumber(event.target.value)}
                  id="phone"
                  name="phone"
                  onClick={() => removeError('phoneNumber')}
                  type="tel"
                  required
                />

                {errors?.phoneNumber?._errors.at(0) && (
                  <span className="cart__error">
                    {errors?.phoneNumber?._errors.at(0)}
                  </span>
                )}
              </div>

              <div className="cart__customer-field">
                <label htmlFor="firstname">First name</label>

                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(event.target.value)}
                  id="firstname"
                  name="firstname"
                  onClick={() => removeError('firstName')}
                  type="text"
                  required
                />

                {errors?.firstName?._errors.at(0) && (
                  <span className="cart__error">
                    {errors?.firstName?._errors.at(0)}
                  </span>
                )}
              </div>

              <div className="cart__customer-field">
                <label htmlFor="city">City</label>

                <div className="cart__customer-field-city" onClick={() => removeError('city')}>
                  <AutoCompleteDropdown
                    logo={true}
                    onSelectOption={setCity}
                    options={cities}
                    placeholder="Select the city"
                  />
                </div>

                {errors?.city?._errors.at(0) && (
                  <span className="cart__error">
                    {errors?.city?._errors.at(0)}
                  </span>
                )}
              </div>

              <div className="cart__customer-field">
                <label htmlFor="lastname">Last name</label>

                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(event.target.value)}
                  id="lastname"
                  name="lastname"
                  onClick={() => removeError('lastName')}
                  type="text"
                  required
                />

                {errors?.lastName?._errors.at(0) && (
                  <span className="cart__error">
                    {errors?.lastName?._errors.at(0)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="cart__content-container">
            <div className="cart__title">Order</div>

            {carts.map(wine => (
              <div className="cart__order">
                <div className="cart__order-info">
                  <img
                    alt="wine"
                    className="cart__order-info-image"
                    src={wine.imageUrl}
                  />
                  <div className="cart__order-info-text">
                    {wine.name}
                    <div className="cart__order-info-text-trademark">{`Seller: ${wine.trademark}`}</div>
                  </div>
                </div>

                <div className="cart__order-quantity">
                  <div className="cart__order-quantity-amount">{`1 pc. x ${wine.price}`}</div>
                  <div className="cart__order-quantity-price">{`${wine.price}$`}</div>
                  <button className="cart__order-quantity-edit">
                    Edit products
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__content-container">
            <div className="cart__title">Delivery</div>

            <div className="cart__delivery">
              <div className="cart__delivery-item">
                <div className="cart__delivery-item-name" onClick={() => removeError('deliveryType')}>
                  <Checkbox
                    blockStyle="delivery"
                    checked={selectedDelivery === 'UKR_POST_PICKUP'}
                    id="UKR_POST_PICKUP"
                    name="UKR_POST_PICKUP"
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="cart__delivery-item-text"
                    htmlFor="UKR_POST_PICKUP"
                  >
                    Pickup from Ukrposhta
                  </label>
                </div>

                {selectedDelivery === 'UKR_POST_PICKUP' && (
                  <div className="cart__delivery-item-dropdown">
                    <label className="cart__delivery-item-dropdown-text">
                      Select the desired branch
                    </label>
                    <div className="cart__delivery-item-select" onChange={() => removeError('shippingAddress')}>
                      <AutoCompleteDropdown
                        logo={true}
                        onSelectOption={setShippingAddress}
                        options={ukrPostOffices}
                        placeholder="Select the UrkPoshta destination address"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="cart__delivery-item">
                <div className="cart__delivery-item-name" onClick={() => removeError('deliveryType')}>
                  <Checkbox
                    blockStyle="delivery"
                    checked={selectedDelivery === 'NOVA_POST_PICKUP'}
                    id="NOVA_POST_PICKUP"
                    name="NOVA_POST_PICKUP"
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="cart__delivery-item-text"
                    htmlFor="NOVA_POST_PICKUP"
                  >
                    Pickup from Nova Poshta
                  </label>
                </div>

                {selectedDelivery === 'NOVA_POST_PICKUP' && (
                  <div className="cart__delivery-item-dropdown">
                    <label className="cart__delivery-item-dropdown-text">
                      Select the desired branch
                    </label>
                    <div className="cart__delivery-item-select" onChange={() => removeError('shippingAddress')}>
                      <AutoCompleteDropdown
                        logo={true}
                        onSelectOption={setShippingAddress}
                        options={novaPostOffices}
                        placeholder="Select the Nova Poshta destination address"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="cart__delivery-item">
                <div className="cart__delivery-item-name" onClick={() => removeError('deliveryType')}>
                  <Checkbox
                    blockStyle="delivery"
                    checked={selectedDelivery === 'NOVA_POST_COURIER'}
                    id="NOVA_POST_COURIER"
                    name="NOVA_POST_COURIER"
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="cart__delivery-item-text"
                    htmlFor="NOVA_POST_COURIER"
                  >
                    By courier from Nova Poshta
                  </label>
                </div>

                {selectedDelivery === 'NOVA_POST_COURIER' && (
                  <div className="cart__delivery-item-dropdown">
                    <label className="cart__delivery-item-dropdown-text">
                      Enter your home address
                    </label>
                    <div className="cart__delivery-item-select">
                      <input
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setShippingAddress(event.target.value)}
                        className="cart__delivery-item-input"
                        onClick={() => removeError('shippingAddress')}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="cart__content-container">
            <div className="cart__title">Payment</div>

            <div className="cart__pay" onClick={() => removeError('paymentType')}>
              <div className="cart__pay-item">
                <div className="cart__pay-item-name">
                  <Checkbox
                    blockStyle="pay"
                    checked={selectedPayment === 'CASH'}
                    id="CASH"
                    name="CASH"
                    onChange={handlePaymentChange}
                  />
                  <label
                    className="cart__pay-item-text"
                    htmlFor="CASH"
                  >
                    Payment upon receipt of goods
                  </label>
                </div>
              </div>

              <div className="cart__pay-item">
                <div className="cart__pay-item-name">
                  <Checkbox
                    blockStyle="pay"
                    checked={selectedPayment === 'CARD'}
                    id="CARD"
                    name="CARD"
                    onChange={handlePaymentChange}
                  />
                  <label className="cart__pay-item-text" htmlFor="CARD">
                    Pay now
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cart__payment">
          <div className="cart__total-title">Total</div>

          <div className="cart__total">
            <div className="cart__total-info">
              <div className="cart__total-info-amount">
                <div className="cart__total-info-amount-name">Order amount</div>
                <div className="cart__total-info-amount-price">{`${totalAmount}$`}</div>
              </div>

              <div className="cart__total-info-amount">
                <div className="cart__total-info-amount-name">
                  The cost of delivery
                </div>
                <div className="cart__total-info-amount-price">{`${costOfDelivery}$`}</div>
              </div>

              <div className="cart__total-info-line"></div>

              <div className="cart__total-info-full">
                <div className="cart__total-info-full-name">Total</div>
                <div className="cart__total-info-full-price">
                  {`${
                  totalAmount + costOfDelivery
                }$`}
                </div>
              </div>
            </div>

            <button className="cart__total-btn" onClick={handleConfirmOrder}>
              Confirm
              <br />
              order
              <div className="cart__total-btn-icon"></div>
            </button>

            <div className="cart__total-text">
              Receipt of an order from ₴5,000 - ₴30,000 upon availability of
              documents. When paying in cash from 30,000 ₴, you must provide
              documents for verification in accordance with the requirements of
              the Law of Ukraine dated 06.12.2019 №361-IX
            </div>

            {carts.length === 0 && (
              <span className="cart__error">Nothing to deliver</span>
            )}
            {errors?.shippingAddress?._errors.at(0) && (
              <span className="cart__error">
                {errors?.shippingAddress?._errors.at(0)}
              </span>
            )}
            {errors?.deliveryType?._errors.at(0) && (
              <span className="cart__error">
                {errors?.deliveryType?._errors.at(0)}
              </span>
            )}
            {errors?.paymentType?._errors.at(0) && (
              <span className="cart__error">
                {errors?.paymentType?._errors.at(0)}
              </span>
            )}

            <div className={modal ? 'cart__modal cart__modal-active' : 'cart__modal'} onClick={() => setModal(false)}>
              <div className={modal ? 'cart__modal-content cart__modal-content-active' : 'cart__modal-content'} onClick={e => e.stopPropagation()}>
                <h2 className="cart__modal-name">Phone number verification</h2>

                <div className="cart__modal-form">
                  <div className="cart__modal-field">
                    <p className="cart__modal-text">A confirmation code has been sent to this phone number</p>
                    <input
                      className="cart__modal-input"
                      placeholder={phoneNumber}
                      type="text"
                      value={phoneNumber}
                      disabled
                    />
                  </div>

                  <div className="cart__modal-field">
                    <p className="cart__modal-text">Confirmation code</p>
                    <div className="cart__modal-code">
                      {confirmationCode.map((digit, index) => (
                        <input
                          className="cart__modal-input"
                          key={index}
                          maxLength={1}
                          onChange={e => handleConfirmationCodeChange(index, e.target.value)}
                          onKeyDown={e => handleKeyDown(index, e)}
                          ref={el => inputRefs.current[index] = el}
                          type="text"
                          value={digit}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="cart__modal-buttons">
                  <button
                    className="cart__modal-confirm"
                    onClick={handleConfirm}
                    type="button"
                  >
                    Confirm
                  </button>

                  <button
                    className="cart__modal-refresh"
                    onClick={handleResend}
                    type="button"
                  >
                    Send again
                    <div className="cart__modal-refresh-time">
                      {`${timer}s`}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className={success ? 'cart__modal cart__modal-active' : 'cart__modal'} onClick={() => setSuccess(true)}>
              <div className={success ? 'cart__modal-success cart__modal-success-active' : 'cart__modal-success'} onClick={e => e.stopPropagation()}>
                <div className="cart__modal-success-container">
                  <p className="cart__modal-dear">
                    <p>Dear Customer,</p>
                    <p>
                      Thank you for your purchase at Wine Library. We greatly appreciate your
                      choice and trust. We are confident that the wine you selected will bring
                      you many delightful moments.
                    </p>
                    <p>
                      If you have any questions or requests, please do not hesitate to contact us.
                      We are always happy to help.
                    </p>
                    <p>
                      Best regards,
                      <br />
                      The Wine Library Team
                    </p>
                  </p>

                  <div className="cart__modal-btn" onClick={() => navigate('/home')}>
                    <button className="cart__modal-btn-text">
                      <p>
                        Go to the
                        <br />
                        Home Page
                      </p>

                      <div className="cart__modal-btn-icon"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
