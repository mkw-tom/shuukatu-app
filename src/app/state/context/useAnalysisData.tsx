'use client'
import type { AnalysisDataType } from '@/lib/mongoDB/models/Analysis'
import type { AnalysisType } from '@/types/AnalysisType'
import type { AnalysisFormAciton } from '@/types/reducerType'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useReducer, useState } from 'react'
import { AnalysisFormDataReducer, AnalysisFormDataState } from '../reducer/analysisFormData'
import type { analisysInputAciton, analisysInputType } from '../reducer/AnalysisFormInput'
import { AnalysisFormInputReducer, AnalysisFormInputState } from '../reducer/AnalysisFormInput'

interface AnalysisContextType {
  Analysis: AnalysisDataType | null
  setAnalysis: Dispatch<SetStateAction<AnalysisDataType | null>>
  formDataState: AnalysisType
  formDataDispatch: Dispatch<AnalysisFormAciton>
  inputState: analisysInputType
  inputDispatch: Dispatch<analisysInputAciton>
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export const useAnalysis = () => {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error('undefined context')
  }
  return context
}

export const AnalysisContextProvider = ({ children }: { children: ReactNode }) => {
  const [formDataState, formDataDispatch] = useReducer(
    AnalysisFormDataReducer,
    AnalysisFormDataState,
  )
  const [inputState, inputDispatch] = useReducer(AnalysisFormInputReducer, AnalysisFormInputState)
  const [Analysis, setAnalysis] = useState<AnalysisDataType | null>(null)

  // useEffect(() => {
  //   fetch()
  // })
  const value = {
    Analysis,
    setAnalysis,
    formDataState,
    formDataDispatch,
    inputState,
    inputDispatch,
  }

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}
