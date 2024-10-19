'use client'
import { useAnalysis } from '@/app/state/context/useAnalysisData'
import type { ArrayFields } from '@/types/reducerType'
import { Close } from '@mui/icons-material'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { useState } from 'react'
import useFetchAnalysis from './useFetchAnalysis'
// import { useAnalysis } from '@/app/formDataState/context/useAnalysisData'

const useAnalysisForm = () => {
  const [inputData, setInputData] = useState<string>('')
  // const [formDataState, formDataDispatch] = useReducer(AnalysisFormDataReducer, AnalysisFormDataState)
  const { formDataDispatch, formDataState, inputState, inputDispatch } = useAnalysis()
  const { fetchAnalysisFunc, loading, success, error } = useFetchAnalysis()

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    inputDispatch({ type: 'SET_INPUT', name, value })
  }

  const selectMBTI = (mbti: string) => {
    formDataDispatch({ type: 'SET_MBTI', mbti })
  }

  const checkValuesSave = (field: ArrayFields, e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (!checked) {
      return formDataDispatch({ type: 'REMOVE_VALUE', field, value })
    }
    formDataDispatch({ type: 'SET_VALUE', field, value })
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
        formDataDispatch({ type: 'SET_VALUE', field, value })
        e.currentTarget.value = ''
        setInputData('')
      }
    }
  }

  const addValue = (field: ArrayFields) => {
    formDataDispatch({ type: 'SET_VALUE', field, value: inputState[field] })
    inputDispatch({ type: 'CLEAR_INPUT', name: field })
  }

  const addTeamRole = (teamRole: string) => {
    formDataDispatch({ type: 'SET_TEAMROLE', teamRole })
  }

  const valueList = (field: ArrayFields) => {
    return (
      <ul className="flex w-full flex-wrap items-center gap-3">
        {formDataState[field].map((value, index) => (
          <li
            key={index}
            className="p y-2 flex h-auto items-center justify-center gap-2 rounded-md bg-base-300 px-2 "
          >
            <button
              onClick={() => formDataDispatch({ type: 'REMOVE_VALUE', field, value })}
              type="button"
            >
              <Close style={{ fontSize: '14px' }} className="text-gray-500" />
            </button>
            <span className="text-gray-600">{value}</span>
          </li>
        ))}
      </ul>
    )
  }

  const handleAnalyze = () => {
    fetchAnalysisFunc(formDataState)
  }

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
    handleChangeInput,
    inputState,
    addValue,
  }
}

export default useAnalysisForm
