import 'server-only'

import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
})