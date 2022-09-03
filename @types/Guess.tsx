type Guess = {
  lat: number;
  lng: number;
  points: number;
  distance: number;
  time: number;
  timedOut?: boolean;
  timedOutWithGuess?: boolean;
}

export default Guess