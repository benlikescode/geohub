import { ObjectId } from 'mongodb'
import { z } from 'zod'

export const locationSchema = z.object({
  lat: z
    .number({ required_error: 'A location is missing lat' })
    .min(-90, 'lat must be at least -90')
    .max(90, 'lat must be at most 90'),
  lng: z
    .number({ required_error: 'A location is missing lng' })
    .min(-180, 'lng must be at least -180')
    .max(180, 'lng must be at most 180'),
  panoId: z.string().optional(),
  heading: z.number().optional(),
  pitch: z.number().optional(),
  zoom: z.number().optional(),
  mapId: z.instanceof(ObjectId).optional(),
  countryCode: z.string().optional(),
})

export const locationsSchema = z.array(locationSchema, { required_error: 'Locations are required' }).min(5)
