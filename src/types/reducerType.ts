interface PostStateType {
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

interface TaskStateType {
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

//------- type of reudcer ---------
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
  payload: PostStateType
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
  payload: TaskStateType
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
