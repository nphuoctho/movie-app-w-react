import { ID, Query } from 'appwrite'
import { DB, tablesDB } from '../lib/appwirte'
import type { MetricRow } from '../types/metric'
import type { Movie } from '../types/movie'

export const updateSearchCount = async (
  searchTerm: string,
  movie: Movie
): Promise<void> => {
  try {
    const result = await tablesDB.listRows<MetricRow>({
      databaseId: DB.id,
      tableId: DB.metrics,
      queries: [Query.equal('searchTerm', searchTerm)],
    })

    if (result.total > 0) {
      const row = result.rows[0]

      await tablesDB.updateRow({
        databaseId: DB.id,
        tableId: DB.metrics,
        rowId: row.$id,
        data: {
          count: row.count + 1,
        },
      })
    } else {
      await tablesDB.createRow({
        databaseId: DB.id,
        tableId: DB.metrics,
        rowId: ID.unique(),
        data: {
          searchTerm: searchTerm,
          count: 1,
          movieId: movie.id,
          posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      })
    }
  } catch (error) {
    console.log('🚀 ~ updateSearchCount ~ error:', error)
  }
}

export const getTrendingMovies = async (): Promise<MetricRow[]> => {
  try {
    const result = await tablesDB.listRows<MetricRow>({
      databaseId: DB.id,
      tableId: DB.metrics,
      queries: [Query.limit(5), Query.orderDesc('count')],
    })

    return result.rows
  } catch (error) {
    console.log('🚀 ~ getTrendingMovies ~ error:', error)
    return []
  }
}
