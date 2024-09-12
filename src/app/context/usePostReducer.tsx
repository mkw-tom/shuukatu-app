'use client'
import type { Dispatch, ReactNode } from 'react'
import { createContext, useContext, useReducer } from 'react'
import { PostReducer, PostState } from '../reducer/PostReducer'

interface PostContextType {
  state: PostStateType
  dispatch: Dispatch<
    | SetCompanyAction
    | SetMypageAction
    | UpdateCompanyAction
    | ClearAction
    | UpdateMypageAction
    | SetTaskAction
    | InitalizeTaskAction
  >
  currentPostId: string
}

const postReducerContext = createContext<PostContextType | undefined>(undefined)

export const usePostReducer = () => {
  const context = useContext(postReducerContext)
  if (!context) {
    throw new Error('undefined context')
  }
  return context
}

export const PostReducerContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(PostReducer, PostState)
  const currentPostId = state.customId as string
  const value = {
    state,
    dispatch,
    currentPostId,
  }

  return <postReducerContext.Provider value={value}>{children}</postReducerContext.Provider>
}
