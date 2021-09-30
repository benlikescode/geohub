import { useEffect } from 'react'
import { useTimeout } from './useTimeout'

export const useDebounce = (callback: any, delay: number, dependencies: [any]) => {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}