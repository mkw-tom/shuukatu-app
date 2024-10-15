'use client'
import type { AnalysisDataType } from '@/lib/mongoDB/models/Analysis'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

interface AnalysisContextType {
  Analysis: AnalysisDataType | null
  setAnalysis: Dispatch<SetStateAction<AnalysisDataType | null>>
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
  const [Analysis, setAnalysis] = useState<AnalysisDataType | null>(null)

  // useEffect(() => {
  //   fetch()
  // })

  return (
    <AnalysisContext.Provider value={{ Analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}
