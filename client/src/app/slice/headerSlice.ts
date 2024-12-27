import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HeaderState {
    category: any,
    post: any
}

const initialState: HeaderState = {
  category: {},
  post: {}
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    saveCategory: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
      return state;
    },
    savePost: (state, action: PayloadAction<any>) => {
      state.post = action.payload;
      return state;
    },
  },
  selectors: {
    selectCategory: (state) => {
      return state.category
    },
    selectPost: (state) => {
      return state.post
    }
  },
})

export const { saveCategory, savePost } = headerSlice.actions
export const { selectCategory, selectPost } = headerSlice.selectors

export default headerSlice.reducer