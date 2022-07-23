import type { FC } from 'react'

export type ComponentWithSchema<T> = FC<T> & {
  schema?: {
    type: string
    name: string
    title: string
    properties: {
      [key in keyof T]?: {
        type: string
        title: string
        items?: any
        widget?: { [key: string]: string }
        defaultValue?: string | number
      }
    }
  }
}
