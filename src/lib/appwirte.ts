// lib/appwrite.ts
import { Client, TablesDB } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

export const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID)

export const tablesDB = new TablesDB(client)

export const DB = {
  id: DATABASE_ID,
  metrics: 'metrics',
} as const
