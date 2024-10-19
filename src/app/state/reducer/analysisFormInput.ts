export interface analisysInputType {
  mbti: string
  skills: string
  certifications: string
  experience: string
  interests: string
  values: string
  workStyle: string
  teamRole: string
}

export const AnalysisFormInputState: analisysInputType = {
  mbti: 'INTJ',
  skills: '',
  certifications: '',
  experience: '',
  interests: '',
  values: '',
  workStyle: '',
  teamRole: '',
}

// export type ArrayFields = 'skills' | 'certifications' | 'experience' | 'interests' | 'values' | 'workStyle'

export type analisysInputAciton =
  | { type: 'SET_INPUT'; name: string; value: string }
  | { type: 'CLEAR_INPUT'; name: string }

export const AnalysisFormInputReducer = (
  state: analisysInputType,
  action: analisysInputAciton,
): analisysInputType => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        [action.name]: action.value,
      }
    case 'CLEAR_INPUT':
      return {
        ...state,
        [action.name]: '',
      }
    default:
      return state
  }
}
