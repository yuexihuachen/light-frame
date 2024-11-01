import { api } from './api'
import {Response, CategoryItem} from "../../interface/index"

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategoryInfo: build.query<Response<CategoryItem>, void>({
      query: () => 'category/find',
      providesTags: ['Category'],
    })
  }),
})

export const {
  useGetCategoryInfoQuery
} = categoryApi
