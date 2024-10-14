export interface FormInputPostType {
  customId: string
  userId: string
  name: string
  event: string
  region: string
  startDate: string
  endDate: string
  completed: boolean
  failed: boolean
  mypage: {
    url: string
    id: string
    password: string
  }
  taskFlow: {
    customId: string
    task: string
    situation: string
    testFormat: string
    date: string
    limitDate: string
    current: boolean
    failed: boolean
    // next: boolean
    finished: boolean
    // edit: boolean
  }
}

export interface FormInputTaskType {
  customId: string
  task: string
  situation: string
  testFormat: string
  date: string
  limitDate: string
  current: boolean
  // next: boolean
  failed: boolean
  finished: boolean
  // edit: boolean
}

export interface FormPostType {
  customId: string
  userId: string
  name: string
  event: string
  region: string
  startDate: string
  endDate: string
  completed: boolean
  failed: boolean
  mypage: {
    url: string
    id: string
    password: string
  }
}

//------- FormInputReducer ---------
export interface ClearAction {
  type: 'CLEAR'
}

export interface SetCompanyAction {
  type: 'SET_COMPANY'
  payload: {
    customId: string
    userId: string
    startDate: string
    endDate: string
    name: string
    value: string
  }
}

export interface InitalizePostAction {
  type: 'INITIALIZE'
  payload: FormPostType
}

export interface SetMypageAction {
  type: 'SET_MYPAGE'
  payload: {
    name: string
    value: string
  }
}

export interface UpdateCompanyAction {
  type: 'UPDATE_COMPANY'
  payload: {
    customId: string
    name: string
    value: string
  }
}

export interface UpdateMypageAction {
  type: 'UPDATE_MYPAGE'
  payload: {
    customId: string
    name: string
    value: string
  }
}

export interface InitalizeTaskAction {
  type: 'INITIALIZE_TASK'
  payload: FormInputTaskType
}

export interface ClearAction {
  type: 'CLEAR'
}

export interface SetTaskAction {
  type: 'SET_TASK'
  payload: {
    customId: string
    name: string
    value: string
    date: string
    limitDate: string
    current: boolean
  }
}

///-----------  PostReducer -------------

export type Action =
  | { type: 'INITIALIZE'; posts: PostType[] }
  | { type: 'ADD_POST'; post: PostType }
  | { type: 'UPDATE_POST'; postId: string; updatedPost: PostType }
  | { type: 'DELETE_POST'; postId: string }
  | { type: 'ADD_TASK'; postId: string; newTask: TaskType }
  | { type: 'UPDATE_TASK'; postId: string; taskId: string; updateTask: TaskType }
  | { type: 'DELETE_TASK'; postId: string; taskId: string }
  | { type: 'SWITCH_TASK'; postId: string; switchedData: TaskType[] }
  | { type: 'ONLY_COMPLETED' }
  | { type: 'ONLY_FAILED' }
  | { type: 'SEARCH_POST'; searchText: string }

///-----------  AnalysisReducer -------------

export type ArrayFields =
  | 'skills'
  | 'certifications'
  | 'experience'
  | 'interests'
  | 'values'
  | 'workStyle'

export type AnalysisFormAciton =
  | { type: 'CLEAR' }
  | { type: 'SET_VALUES'; name: string; array: string[] }
  | { type: 'SET_VALUE' | 'REMOVE_VALUE'; field: ArrayFields; value: string }
  | { type: 'SET_MBTI'; mbti: string }
  | { type: 'SET_TEAMROLE'; teamRole: string }
