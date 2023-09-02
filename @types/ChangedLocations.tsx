import { LocationType } from '@types'

type ChangedLocations = {
  additions: LocationType[]
  modifications: LocationType[]
  deletions: string[]
}

export default ChangedLocations
