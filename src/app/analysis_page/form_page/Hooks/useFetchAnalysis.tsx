'use client'
import { useReducer, useState } from 'react'
// import { AnalysisFormInputReducer, AnalysisFormInputState, AnalysisFormInputType } from '../../../state/reducer/analysisFormInput'
import { useAnalysis } from '@/app/state/context/useAnalysisData'
import { useUser } from '@/app/state/context/useUser'
// import {
//   AnalysisFormDataReducer,
//   AnalysisFormDataState,
// } from '@/app/state/reducer/AnalysisFormData'
// import {
//   AnalysisFormDataReducer,
//   AnalysisFormDataState,
// } from '@/app/state/reducer/AnalysisFormData'
// import {
//   AnalysisFormDataReducer,
//   AnalysisFormDataState,
// } from '@/app/state/reducer/AnalysisFormData'
import {
  AnalysisFormDataReducer,
  AnalysisFormDataState,
} from '@/app/state/reducer/AnalysisFormData'
import type { AnalysisType } from '@/types/AnalysisType'

const useFetchAnalysis = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [state, reducer] = useReducer(AnalysisFormDataReducer, AnalysisFormDataState)
  const { formDataDispatch } = useAnalysis()
  const { user } = useUser()
  const { setAnalysis } = useAnalysis()
  const data = {
    userId: user?.customId,
    ...state,
  }

  const fetchAnalysisFunc = async (state: AnalysisType) => {
    setLoading(true)
    const { mbti, skills, certifications, experience, values, interests, workStyle, teamRole } =
      state

    try {
      const url = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL
      const res = await fetch(`${url}/api/selfAnalysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.customId,
          mbti,
          skills,
          certifications,
          experience,
          values,
          interests,
          workStyle,
          teamRole,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        setError(true)
        throw new Error(errorData.error || 'An error occurred')
      }

      setSuccess(true)
      const result = await res.json()

      // formDataDispatch({ type: 'CLEAR'})
      return setAnalysis(result)
    } catch (error) {
      formDataDispatch({ type: 'CLEAR' })
      console.log('faild fetch')
      setError(true)
    } finally {
      formDataDispatch({ type: 'CLEAR' })
      setLoading(false)
    }
  }

  return { loading, fetchAnalysisFunc, data, success, error }
}

export default useFetchAnalysis
