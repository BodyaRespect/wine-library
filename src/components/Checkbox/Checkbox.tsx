import React from 'react'

interface CheckboxProps {
  id: string
  name: string
  checked: boolean
  blockStyle: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, name, checked, blockStyle, onChange }) => {
  return (
    <label className="cart__delivery-item-checkbox" htmlFor={id}>
      <input
        checked={checked}
        className="cart__delivery-item-checkbox-default"
        id={id}
        name={name}
        onChange={onChange}
        type="checkbox"
      />

      <div className={`cart__${blockStyle}-item-checkbox-custom ${checked ? 'checked' : ''}`}></div>
    </label>
  )
}
