import type { Models } from 'appwrite'

export interface MetricRow extends Models.Row {
  searchTerm: string
  count: number
  posterUrl: string
  movieId: number
}
