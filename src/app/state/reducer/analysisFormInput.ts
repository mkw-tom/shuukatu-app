import type { AnalysisType } from '@/types/AnalysisType'
import type { AnalysisFormAciton } from '@/types/reducerType'

export const AnalysisFormInputState: AnalysisType = {
  mbti: '',
  skills: [],
  certifications: [],
  experience: [],
  interests: [],
  values: [],
  workStyle: [],
  teamRole: '',
}

// export type ArrayFields = 'skills' | 'certifications' | 'experience' | 'interests' | 'values' | 'workStyle'

// type AnalysisFormAciton =
//   | { type: 'CLEAR' }
//   | { type: 'SET_VALUES'; name: string; array: string[] }
//   | { type: 'SET_VALUE' | 'REMOVE_VALUE'; field: ArrayFields; value: string }
//   | { type: 'SET_MBTI'; mbti: string}
//   | { type: 'SET_TEAMROLE', teamRole: string }
export const AnalysisFormInputReducer = (
  state: AnalysisType,
  action: AnalysisFormAciton,
): AnalysisType => {
  switch (action.type) {
    case 'CLEAR':
      return {
        ...state,
        ...AnalysisFormInputState,
      }

    case 'SET_VALUE':
      return {
        ...state,
        [action.field]: [...state[action.field], action.value],
      }
    case 'REMOVE_VALUE':
      return {
        ...state,
        [action.field]: state[action.field].filter((item) => item !== action.value),
      }
    case 'SET_MBTI':
      return {
        ...state,
        mbti: action.mbti,
      }
    case 'SET_TEAMROLE':
      return {
        ...state,
        teamRole: action.teamRole,
      }
    default:
      return state
  }
}
