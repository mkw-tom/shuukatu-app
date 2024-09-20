interface FormInputPostType {
  customId: string
  userId: string
  name: string
  event: string
  region: string
  startDate: string
  endDate: string
  completed: boolean
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
    next: boolean
    finished: boolean
    edit: boolean
  }
}

interface FormInputTaskType {
  customId: string
  task: string
  situation: string
  testFormat: string
  date: string
  limitDate: string
  current: boolean
  next: boolean
  finished: boolean
  edit: boolean
}

interface FormPostType {
  customId: string
  userId: string
  name: string
  event: string
  region: string
  startDate: string
  endDate: string
  completed: boolean
  mypage: {
    url: string
    id: string
    password: string
  }
}

//------- FormInputReducer ---------
interface ClearAction {
  type: 'CLEAR'
}

interface SetCompanyAction {
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

interface InitalizePostAction {
  type: 'INITIALIZE'
  payload: FormPostType
}

interface SetMypageAction {
  type: 'SET_MYPAGE'
  payload: {
    name: string
    value: string
  }
}

interface UpdateCompanyAction {
  type: 'UPDATE_COMPANY'
  payload: {
    customId: string
    name: string
    value: string
  }
}

interface UpdateMypageAction {
  type: 'UPDATE_MYPAGE'
  payload: {
    customId: string
    name: string
    value: string
  }
}

interface InitalizeTaskAction {
  type: 'INITIALIZE_TASK'
  payload: FormInputTaskType
}

interface ClearAction {
  type: 'CLEAR'
}

interface SetTaskAction {
  type: 'SET_TASK'
  payload: {
    customId: string
    name: string
    value: string
    date: string
    limitDate: string
  }
}

///-----------  PostReducer -------------

type Action =
  | { type: 'INITIALIZE'; posts: PostType[] }
  | { type: 'ADD_POST'; post: PostType }
  | { type: 'UPDATE_POST'; postId: string; updatedPost: PostType }
  | { type: 'DELETE_POST'; postId: string }
  | { type: 'ADD_TASK'; postId: string; newTask: TaskType }
  | { type: 'UPDATE_TASK'; postId: string; taskId: string; updateTask: TaskType }
  | { type: 'DELETE_TASK'; postId: string; taskId: string }
  | { type: 'SWITCH_TASK'; postId: string; switchedData: TaskType[] }
