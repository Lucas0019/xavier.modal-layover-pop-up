import React from 'react'

interface ILayoverInput {
  type?: string
  placeholder: string
  onChangeText: (text: string) => void
  value: string
  className?: string
}

export const LayoverInput = ({
  type = 'text',
  placeholder,
  onChangeText,
  value,
  className,
}: ILayoverInput) => {
  return (
    <input
      id="date"
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChangeText(e.target.value)}
      value={value}
      className={className}
    />
  )
}
