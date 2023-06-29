const DEFAULT_STYLES = {
  strokeOpacity: 0.95,
  strokeWeight: 0.5,
  fillOpacity: 0.5,
  cursor: 'crosshair',
}

export const POLYGON_STYLES = {
  guess: {
    fillColor: '#8670c7',
    strokeColor: '#6e55ae',
    ...DEFAULT_STYLES,
  },
  correct: {
    fillColor: '#15a864',
    strokeColor: '#187e4e',
    ...DEFAULT_STYLES,
  },
  incorrect: {
    fillColor: '#e00c0c',
    strokeColor: '#880f0f',
    ...DEFAULT_STYLES,
  },
}
