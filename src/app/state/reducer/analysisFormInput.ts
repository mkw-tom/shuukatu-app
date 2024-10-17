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
  mbti: '',
  skills: '',
  certifications: '',
  experience: '',
  interests: '',
  values: '',
  workStyle: '',
  teamRole: '',
}

// export type ArrayFields = 'skills' | 'certifications' | 'experience' | 'interests' | 'values' | 'workStyle'

type analisysInputAciton = { type: 'SET_INPUT'; name: string; value: string }

export const AnalysisFormInputReducer = (
  state: analisysInputType,
  action: analisysInputAciton,
): analisysInputType => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...AnalysisFormInputState,
        [action.name]: action.value,
      }
    default:
      return state
  }
}
