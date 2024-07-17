import type { Wine } from '@/types/Wine'

import { Message } from '@/components/Message'
import { ProductList } from '@/components/ProductList/ProductList'
import axios from 'axios'
import { useState } from 'react'

export const SelectionPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [requests, setRequests] = useState<string[]>([])
  const [advice, setAdvice] = useState<string>('')
  const [wines, setWines] = useState<Wine[]>([])
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleButtonClick = async () => {
    setError('')

    if (inputValue.length < 10) {
      setError('Please, provide more information!')
    }

    if (!error && inputValue.trim() !== '') {
      const userQuery = inputValue

      setRequests((prevRequests) => {
        const newRequests = [...prevRequests, inputValue]
        return newRequests.slice(-5)
      })

      setInputValue('')

      try {
        const response = await axios.post('http://api.winelibrary.wuaze.com/selection', {
          userQuery: userQuery,
        })

        const { advice, wines } = response.data

        console.log(wines)

        setAdvice(advice)
        setWines(wines.slice(0, 4))
      }
      catch (error) {
        console.log(error)
        setError(`${error}`)
      }
    }
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  return (
    <div className="container">
      <div className="selection-container">
        {requests.length > 0
          ? (
            <>
              <div className="chat-container">
                <div className="request__list">
                  {requests.map((message, index) => (
                    <Message key={index} message={message} />
                  ))}
                </div>

                {advice && (
                  <div className="response">
                    <div className="responses__text">
                      <Message message={advice} />
                    </div>

                    <div className="responses__wines">
                      <ProductList column={4} wines={wines} />
                    </div>
                  </div>
                )}
              </div>
            </>
            )
          : (
            <>
              <h1>
                Make a request to help Bobik
                <br />
                find the perfect bottle of wine for you
              </h1>
              <p>
                Enter your query or use the most popular queries and
                <br />
                I’ll find the perfect bottle of wine just for you
              </p>
              <div className="query-list">
                As examples:
                <Message message="I have a budget of 1000 $. Suggest something semi-sweet" />
                <Message message="What are your most popular rosé wines?" />
                <Message message="I want to make a gift for my husband, what would you recommend?" />
                <Message message="My favourite wine is Italian, give me some advice" />
                <Message message="I have a headache after wine, what do you recommend?" />
              </div>
            </>
            )}

        <div className="selection">
          <label className="selection-label">
            <input
              className="selection-input"
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              value={inputValue}
            />

            <button className="selection-button" onClick={handleButtonClick}>
              <div className="selection-button-icon"></div>
            </button>
          </label>

          {error && (<span className="selection__error">{error}</span>)}
        </div>
      </div>
    </div>
  )
}
