'use client'
import type { Dispatch, ReactNode } from 'react'
import { createContext, useContext, useReducer } from 'react'
import { PostReducer, PostState } from '../reducer/PostReducer'

interface PostContextType {
  state: PostStateType
  dispatch: Dispatch<
    SetCompanyAction | SetMypageAction | UpdateCompanyAction | ClearAction | UpdateMypageAction
  >
}

const postContext = createContext<PostContextType | undefined>(undefined)

export const usePost = () => {
  const context = useContext(postContext)
  if (!context) {
    throw new Error('undefined context')
  }
  return context
}

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(PostReducer, PostState)

  const value = {
    state,
    dispatch,
  }

  return <postContext.Provider value={value}>{children}</postContext.Provider>
}
