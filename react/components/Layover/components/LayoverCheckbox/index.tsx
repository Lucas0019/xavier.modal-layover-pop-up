import React from 'react'

interface ILayoverCheckbox {
  options?: string[]
  value?: string[]
  setValue: React.Dispatch<React.SetStateAction<string[]>>
}

export const LayoverCheckbox = ({
  options,
  value,
  setValue,
}: ILayoverCheckbox) => {
  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      setValue((previousState) => [...previousState, target.value])
    } else {
      setValue((previousState) => [
        ...previousState.filter((item) => item !== target.value),
      ])
    }
  }

  return (
    <>
      {options?.map((option) => (
        <label key={option}>
          <span>{option}</span>
          <input
            type="checkbox"
            value={option}
            checked={value?.includes(option)}
            onChange={(onchangeprops) => handleChange(onchangeprops)}
          />
        </label>
      ))}
    </>
  )
}
