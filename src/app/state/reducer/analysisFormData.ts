import type { AnalysisType } from '@/types/AnalysisType'
import type { AnalysisFormAciton } from '@/types/reducerType'

export const AnalysisFormDataState: AnalysisType = {
  mbti: 'INTJ',
  skills: [],
  certifications: [],
  experience: [],
  interests: [],
  values: [],
  workStyle: [],
  teamRole: '',
}

export const AnalysisFormDataReducer = (
  state: AnalysisType,
  action: AnalysisFormAciton,
): AnalysisType => {
  switch (action.type) {
    case 'CLEAR':
      return {
        ...state,
        ...AnalysisFormDataState,
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
