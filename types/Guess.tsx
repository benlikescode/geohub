type Guess = {
  lat: string;
  lng: string;
  points: number;
  distance: number;
  time: number;
  timedOut?: boolean;
}

export default Guess