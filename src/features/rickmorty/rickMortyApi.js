import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    // List endpoint — server-side pagination + name/status/species filters
    getCharacters: builder.query({
      query: ({ page = 1, name = '', status = '', species = '' } = {}) => {
        const params = new URLSearchParams({ page })
        if (name.trim())    params.set('name',    name.trim())
        if (status.trim())  params.set('status',  status.trim())
        if (species.trim()) params.set('species',  species.trim())
        return `character?${params}`
      },
    }),

    // Single character by ID
    getCharacterById: builder.query({
      query: (id) => `character/${id}`,
    }),

    // Episodes list — server-side pagination + optional name filter
    getEpisodes: builder.query({
      query: ({ page = 1, name = '' } = {}) => {
        const params = new URLSearchParams({ page })
        if (name.trim()) params.set('name', name.trim())
        return `episode?${params}`
      },
    }),

    // Single episode by ID
    getEpisodeById: builder.query({
      query: (id) => `episode/${id}`,
    }),

    // Multiple characters by array of IDs (for favorites page)
    getCharactersByIds: builder.query({
      query: (ids) => `character/${ids.join(',')}`,
      // API returns object (not array) when only 1 ID — normalise to array
      transformResponse: (res) => (Array.isArray(res) ? res : [res]),
    }),
  }),
})

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetEpisodesQuery,
  useGetEpisodeByIdQuery,
  useGetCharactersByIdsQuery,
} = rickMortyApi
