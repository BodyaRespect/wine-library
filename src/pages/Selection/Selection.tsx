import type { SetStateAction } from 'react'

import { Message } from '@/components/Message'
import { useState } from 'react'

export const SelectionPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [requests, setRequests] = useState<string[]>([])
  // const [responses, serResponses] = useState<string[]>([])

  const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
  }

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      setRequests((prevResponses) => {
        const newResponses = [...prevResponses, inputValue]
        return newResponses.slice(-5)
      })
      setInputValue('')
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
        {requests.length
          ? (
            <div className="request__list">
              {requests.map((message, index) => (
                <>
                  <Message key={index} message={message} />
                </>
              ))}
            </div>
            )
          : (
            <>
              <h1>
                Make a request to help Yarik
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
                <Message message="I have a budget of 1000 UAH. Suggest something semi-sweet" />
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
              onKeyPress={handleKeyPress}
              value={inputValue}
            />

            <button className="selection-button" onClick={handleButtonClick}>
              <div className="selection-button-icon"></div>
            </button>
          </label>
        </div>
      </div>
    </div>
  )
}
