import { v4 as uuidv4 } from 'uuid'

export const PostState: PostStateType = {
  customId: '',
  userId: '',
  name: '',
  event: '',
  startDate: '',
  endDate: '',
  region: '',
  completed: false,
  mypage: {
    url: '',
    id: '',
    password: '',
  },
  taskFlow: [
    {
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
    },
  ],
}

// interface SetTaskAction {
//   type: 'SET_TASK'
//   payload: {
//     customId: string
//     name: string
//     value: string
//     order: string
//     orderValue: boolean
//   }
// }

// interface UpdateTaskAction {
//   type: 'UPDATE_TASK',
//   payload: {
//     index: number
//     name: string
//     value: string
//     order: string
//     orderValue: boolean
//   }
// }

// interface FinishedTaskAction {
//   type: 'FINISHED_TASK',
//   payload: {
//     index: number
//   }
// }

export const PostReducer = (
  postState: PostStateType,
  action:
    | SetCompanyAction
    | SetMypageAction
    | UpdateCompanyAction
    | ClearAction
    | UpdateMypageAction,
): PostStateType => {
  switch (action.type) {
    case 'CLEAR':
      return {
        ...postState,
        customId: '',
        userId: '',
        name: '',
        event: '',
        startDate: '',
        endDate: '',
        region: '',
        completed: false,
        mypage: {
          url: '',
          id: '',
          password: '',
        },
      }
    case 'SET_COMPANY':
      return {
        ...postState,
        customId: uuidv4(),
        userId: action.payload.userId,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        [action.payload.name]: action.payload.value,
      }
    case 'SET_MYPAGE':
      return {
        ...postState,
        mypage: {
          ...postState.mypage,
          [action.payload.name]: action.payload.value,
        },
      }

    case 'UPDATE_COMPANY':
      return {
        ...postState,
        customId: action.payload.costomId,
        [action.payload.name]: action.payload.value,
      }

    case 'UPDATE_MYPAGE':
      return {
        ...postState,
        customId: action.payload.customId,
        mypage: {
          ...postState.mypage,
          [action.payload.name]: action.payload.value,
        },
      }

    default:
      return postState
  }
}
// case 'SET_TASK':
//   return {
//     ...postState,
//     taskFlow: [
//       ...postState.taskFlow,
//       {
//         [action.payload.name]: action.payload.value,
//         [action.payload.order]: action.payload.orderValue,
//       },
//     ],
//   }

// case 'UPDATE_TASK':
//   return {
//     ...postState,
//     taskFlow: [
//       ...postState.taskFlow,
//       {
//         ...postState.taskFlow[action.payload.index],
//         [action.payload.name]: action.payload.value,
//         [action.payload.order]: action.payload.orderValue,
//       },
//     ],
//   }
// case 'FINISHED_TASK':
//   return {
//     ...postState,
//     taskFlow: [
//       ...postState.taskFlow,
//       {
//         ...postState.taskFlow[action.payload.index],
//         finised: true,
//       },
//     ],
//   }
