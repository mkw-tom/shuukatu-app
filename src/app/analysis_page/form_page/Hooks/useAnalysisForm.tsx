'use client'
import type { ArrayFields } from '@/types/reducerType'
import { Close } from '@mui/icons-material'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useReducer, useState } from 'react'
import {
  AnalysisFormDataReducer,
  AnalysisFormDataState,
} from '../../../state/reducer/analysisFormData'
import useFetchAnalysis from './useFetchAnalysis'

const useAnalysisForm = () => {
  const [inputData, setInputData] = useState<string>('')
  const [state, dispatch] = useReducer(AnalysisFormDataReducer, AnalysisFormDataState)
  const { fetchAnalysisFunc, loading, success, error } = useFetchAnalysis()

  const selectMBTI = (mbti: string) => {
    dispatch({ type: 'SET_MBTI', mbti })
  }

  const checkValuesSave = (field: ArrayFields, e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (!checked) {
      return dispatch({ type: 'REMOVE_VALUE', field, value })
    }
    dispatch({ type: 'SET_VALUE', field, value })
  }

  const handleAddValue = (
    field: ArrayFields,
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // e.preventDefault()
    setInputData(e?.currentTarget?.value)
    const value = e.currentTarget.value

    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputData === value && value !== '') {
        dispatch({ type: 'SET_VALUE', field, value })
        e.currentTarget.value = ''
        setInputData('')
      }
    }
  }

  const addTeamRole = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.currentTarget.value

    if (e.key === 'Enter' && value) {
      e.preventDefault()

      dispatch({ type: 'SET_TEAMROLE', teamRole: value })
    }
  }

  const valueList = (field: ArrayFields) => {
    return (
      <ul className="flex w-full flex-wrap items-center gap-3">
        {state[field].map((value, index) => (
          <li
            key={index}
            className="p y-2 flex h-auto items-center justify-center gap-2 rounded-md bg-base-300 px-2 "
          >
            <button onClick={() => dispatch({ type: 'REMOVE_VALUE', field, value })} type="button">
              <Close style={{ fontSize: '14px' }} className="text-gray-500" />
            </button>
            <span className="text-gray-600">{value}</span>
          </li>
        ))}
      </ul>
    )
  }
  console.log(state)
  const handleAnalyze = () => {
    fetchAnalysisFunc(state)
  }

  console.log(state)
  return {
    checkValuesSave,
    handleAddValue,
    valueList,
    selectMBTI,
    addTeamRole,
    handleAnalyze,
    loading,
    success,
    error,
  }
}

export default useAnalysisForm
