import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { nanoid } from "nanoid";
import { RootState } from '../store'

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    // 使用getState 访问您的 redux 存储
    const store = (getState() as RootState);
    // if (token) {
    //   headers.set('authentication', `Bearer ${token}`)
    // }
    console.log(store);

    const requestId = nanoid();
    headers.set('X-Request-ID', requestId);
    return headers
  },
})

// 将baseQuery包装到api里
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

/**
 * 提供一个固定的请求路径
 * reducerPath用于在 Redux store（数据存储中心）中确定 API 相关 reducer的挂载路径。
 * tagTypes用于定义一组标签（tags）类型，这些标签主要用于缓存失效（cache invalidation）和数据更新的同步。
 * endpoints描述了如何与服务器进行通信以获取、更新、删除或创建数据。
 */
export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Category', 'PostList', 'Post','Categories'],
  endpoints: () => ({}),
})
