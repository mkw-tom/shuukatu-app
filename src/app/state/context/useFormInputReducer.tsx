'use client'
import type {
  ClearAction,
  FormInputPostType,
  InitalizePostAction,
  InitalizeTaskAction,
  SetCompanyAction,
  SetMypageAction,
  SetTaskAction,
  UpdateCompanyAction,
  UpdateMypageAction,
} from '@/types/reducerType'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useReducer, useState } from 'react'
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
  formSlide: string
  setFormSlide: Dispatch<SetStateAction<string>>
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
  const [formSlide, setFormSlide] = useState<string>('-translate-x-1000')
  const currentPostId = state.customId as string
  const value = {
    state,
    dispatch,
    currentPostId,
    formSlide,
    setFormSlide,
  }

  return (
    <formInputReducerContext.Provider value={value}>{children}</formInputReducerContext.Provider>
  )
}
