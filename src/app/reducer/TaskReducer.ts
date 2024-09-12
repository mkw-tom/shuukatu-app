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

interface InitalizeAction {
  type: 'INITIALIZE'
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
interface UpdateTaskAction {
  type: 'UPDATE_TASK'
  payload: {
    customId: string
    name: string
    value: string
    date: string
    limitDate: string
  }
}

interface DeleteTaskActioin {
  type: 'DELETE_TASK'
  payload: {
    customId: string
  }
}

export const TaskState: TaskStateType = {
  customId: '',
  task: '',
  situation: '',
  testFormat: '',
  date: '',
  limitDate: '',
  current: false,
  next: false,
  finished: false,
  edit: false,
}

export const TaskReducer = (
  TaskState: TaskStateType,
  action: SetTaskAction | UpdateTaskAction | DeleteTaskActioin | InitalizeAction | ClearAction,
) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload

    case 'CLEAR':
      return {
        customId: '',
        task: '',
        situation: '',
        testFormat: '',
        date: '',
        limitDate: '',
        current: false,
        next: false,
        finished: false,
        edit: false,
      }

    case 'SET_TASK':
      return {
        ...TaskState,
        customId: action.payload.customId,
        [action.payload.name]: action.payload.value,
        date: action.payload.date,
        limitDate: action.payload.limitDate,
      }

    // case 'UPDATE_TASK':
    //   return TaskState.map((task) =>
    //     task.customId === action.payload.customId
    //       ? {
    //           ...TaskState,
    //           [action.payload.name]: action.payload.value,
    //           date: action.payload.date,
    //           limitDate: action.payload.limitDate,
    //         }
    //       : task,
    //   )

    // case 'DELETE_TASK':
    //   return TaskState.filter((task) => task.customId !== action.payload.customId);

    default:
      return TaskState
  }
}
