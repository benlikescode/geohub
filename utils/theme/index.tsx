import { breakpoint } from './breakpoint'
import { color } from './color'
import { elevation } from './elevation'

export const theme = {
  color,
  elevation,
  breakpoint
}

export type Theme = typeof theme