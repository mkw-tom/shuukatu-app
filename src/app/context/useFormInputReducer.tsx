'use client'
import type { Dispatch, ReactNode } from 'react'
import { createContext, useContext, useReducer } from 'react'
import { FormInputReducer, FormInputState } from '../reducer/FormInputReducer'

interface PostContextType {
  state: FormInputPostType
  dispatch: Dispatch<
    | SetCompanyAction
    | SetMypageAction
    | UpdateCompanyAction
    | ClearAction
    | UpdateMypageAction
    | SetTaskAction
    | InitalizeTaskAction
    | InitalizePostAction
  >
  currentPostId: string
}

const formInputReducerContext = createContext<PostContextType | undefined>(undefined)

export const usePostReducer = () => {
  const context = useContext(formInputReducerContext)
  if (!context) {
    throw new Error('undefined context')
  }
  return context
}

export const FormInputReducerContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(FormInputReducer, FormInputState)
  const currentPostId = state.customId as string
  const value = {
    state,
    dispatch,
    currentPostId,
  }

  return (
    <formInputReducerContext.Provider value={value}>{children}</formInputReducerContext.Provider>
  )
}
