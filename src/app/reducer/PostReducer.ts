import { v4 as uuidv4 } from 'uuid'
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
  // taskFlow: [
  //   {
  //     customId: string
  //     task: string
  //     situation: string
  //     testFormat: string
  //     date: string
  //     limitDate: string
  //     current: boolean
  //     next: boolean
  //     finished: boolean
  //     edit: boolean
  //   },
  // ]
}

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
  // taskFlow: [
  //   {
  //     customId: '',
  //     task: '',
  //     situation: '',
  //     testFormat: '',
  //     date: '',
  //     limitDate: '',
  //     current: false,
  //     next: false,
  //     finished: false,
  //     edit: false,
  //   },
  // ],
}

interface ClearAction {
  type: 'CLEAR'
}

interface SetCompanyAction {
  type: 'SET_COMPANY'
  payload: {
    userId: string
    name: string
    value: string
  }
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
    name: string
    value: string
  }
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
  action: SetCompanyAction | SetMypageAction | UpdateCompanyAction | ClearAction,
): PostStateType => {
  switch (action.type) {
    case 'CLEAR':
      return {
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
        [action.payload.name]: action.payload.value,
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
