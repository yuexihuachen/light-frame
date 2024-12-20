import { api } from './api'
import {Response, PostItem} from "../../interface/index"

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPostInfo: build.query<Response<Omit<PostItem, 'content'>[]>, void>({
      query: () => 'post/find',
      providesTags: ['Post'],
    })
  }),
})

export const {
  useGetPostInfoQuery
} = postApi
