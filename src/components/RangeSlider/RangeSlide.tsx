import React, { useState } from 'react'
import ReactSlider from 'react-slider'

interface Props {
  onChange: (min: number, max: number) => void
}

export const RangeSlider: React.FC<Props> = ({ onChange }) => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([1, 100000])

  const handleInputChange = (index: number, value: number) => {
    let newRangeValue: [number, number] = [0, 0]

    index === 0 ? newRangeValue = [value, rangeValue[1]] : newRangeValue = [rangeValue[0], value]

    setRangeValue(newRangeValue)
    onChange(newRangeValue[0], newRangeValue[1])
  }

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setRangeValue([value[0], value[1]])
      onChange(value[0], value[1])
    }
  }

  return (
    <div className="range-slider">
      <div className="range-slider__inputs">
        <input
          onChange={(e) => {
            const value = Number(e.target.value)
            handleInputChange(0, value)
          }}
          className="range-slider__input"
          max="100000"
          min="1"
          type="number"
          value={rangeValue[0]}
        />

        <span>-</span>

        <input
          onChange={(e) => {
            const value = Number(e.target.value)
            handleInputChange(1, value)
          }}
          className="range-slider__input"
          max="100000"
          min="1"
          type="number"
          value={rangeValue[1]}
        />
      </div>
      <ReactSlider
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        className="horizontal-slider"
        max={1000}
        min={1}
        minDistance={100}
        onChange={handleSliderChange}
        thumbClassName="example-thumb"
        trackClassName="example-track"
        value={[rangeValue[0], rangeValue[1]]}
        pearling
        withTracks
      />
    </div>
  )
}
