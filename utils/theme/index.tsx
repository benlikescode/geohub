import { elevation } from './elevation'
import { breakpoint } from './breakpoint'
import { color } from './color'

export const theme = {
  color,
  elevation,
  breakpoint
}

export type Theme = typeof theme