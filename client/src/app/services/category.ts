import { api } from './api'
import {Response, CategoryItem} from "../../interface/index"

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategoryInfo: build.query<Response<CategoryItem[]>, void>({
      query: () => 'category/find',
      providesTags: ['Category'],
    }),
    categoryInfo: build.mutation<CategoryItem, any>({
      query: initialPost => ({
        url: `category/find`,
        method: 'POST',
        body: initialPost
      }),
      invalidatesTags: ['Categories'],
    })
  }),
  
})

export const {
  useGetCategoryInfoQuery,
  useCategoryInfoMutation
} = categoryApi
