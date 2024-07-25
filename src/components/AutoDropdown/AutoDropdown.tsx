import React, { useEffect, useRef, useState } from 'react'

interface Props {
  options: string[]
  onSelectOption: (option: string) => void
  placeholder: string
  logo: boolean
}

export const AutoCompleteDropdown: React.FC<Props> = ({ options, onSelectOption, placeholder, logo }) => {
  const [isLogo, setIsLogo] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      onSelectOption(value)
    }, 1000)

    const newFilteredOptions = options.filter(item =>
      item.toLowerCase().includes(value.toLowerCase()),
    )

    setFilteredOptions(newFilteredOptions)
    setShowOptions(true)
  }

  const handleOptionClick = (option: string) => {
    setInputValue(option)
    setShowOptions(false)
    onSelectOption(option)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowOptions(false)
    }
  }

  const handleInputClick = () => {
    setFilteredOptions(options)
    setShowOptions(prevShowOptions => !prevShowOptions)
  }

  useEffect(() => {
    setIsLogo(logo)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [logo])

  return (
    <div className="autocomplete-dropdown" ref={dropdownRef}>
      <div className="autocomplete-dropdown-header">
        {isLogo && (
          <div className="autocomplete-dropdown-header-icon" onClick={() => setShowOptions(true)}></div>
        )}
        <input
          className="autocomplete-input"
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          type="text"
          value={inputValue}
        />
      </div>

      {showOptions && filteredOptions.length > 0 && (
        <div className="autocomplete-dropdown-body">
          {filteredOptions.map((item, index) => (
            <div
              className="autocomplete-dropdown-item"
              key={index}
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
