import { api } from './api'
import {Response, PostItem} from "../../interface/index"

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPostInfo: build.query<Response<Omit<PostItem, 'content'>[]>, void>({
      query: () => 'post/find',
    }),
    postInfo: build.mutation<PostItem, any>({
      query: initialPost => ({
        url: `post/find`,
        method: 'POST',
        body: initialPost
      }),
      invalidatesTags: ['PostList'],
    })
  }),
})

export const {
  useGetPostInfoQuery,
  usePostInfoMutation
} = postApi
