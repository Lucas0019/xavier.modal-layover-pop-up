import React from 'react'

import styles from './styles.css'

interface ILayoverRadio {
  options?: string[]
  value?: string
  setValue: (value: 'masculino' | 'feminino') => void
}

export const LayoverRadio = ({
  options,
  value,
  setValue,
  ...props
}: ILayoverRadio) => {
  return (
    <>
      {options?.map((option) => (
        <label key={option} className={styles.labelLayoverRadio}>
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={({ target }) =>
              setValue(target.value as 'masculino' | 'feminino')
            }
            {...props}
          />
          {option}
        </label>
      ))}
    </>
  )
}
