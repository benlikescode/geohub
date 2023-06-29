const DEFAULT_STYLES = {
  strokeOpacity: 0.95,
  strokeWeight: 0.5,
  fillOpacity: 0.5,
  cursor: 'crosshair',
}

export const POLYGON_STYLES = {
  pink: {
    fillColor: '#D47CBF',
    strokeColor: '#A15D91',
    ...DEFAULT_STYLES,
  },
  purple: {
    fillColor: '#7e3dc9',
    strokeColor: '#640d9b',
    ...DEFAULT_STYLES,
  },
  red: {
    fillColor: '#E00C0C',
    strokeColor: '#880F0F',
    ...DEFAULT_STYLES,
  },
  green: {
    fillColor: '#15A864',
    strokeColor: '#187E4E',
    ...DEFAULT_STYLES,
  },
}
