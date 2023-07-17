import Game from '@backend/models/game'

// This is the best way I found to enable POIs
const showPOIs = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      {
        visibility: '#on',
      },
    ],
  },
]

export const GUESS_MAP_OPTIONS = {
  disableDefaultUI: true,
  clickableIcons: false,
  gestureHandling: 'greedy',
  minZoom: 1,
  draggableCursor: 'crosshair',
  styles: showPOIs,
}

export const RESULT_MAP_OPTIONS = {
  disableDefaultUI: true,
  clickableIcons: false,
  gestureHandling: 'greedy',
  minZoom: 2,
  styles: showPOIs,
}

export const getStreetviewOptions = (gameData: Game) => {
  return {
    addressControl: false, // hide address
    panControl: true, // compass
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    }, // compass position
    motionTracking: false, // mobile tracking
    motionTrackingControl: false, // hide default UI elements
    enableCloseButton: false, // hide default UI elements
    zoomControl: false, // hide default UI elements
    fullscreenControl: false, // hide default UI elements
    showRoadLabels: false, // hide road labels
    clickToGo: gameData.gameSettings.canMove, // move on click
    scrollwheel: gameData.gameSettings.canZoom, // zoom on scroll
    linksControl: gameData.gameSettings.canMove, // arrows to move
  }
}
