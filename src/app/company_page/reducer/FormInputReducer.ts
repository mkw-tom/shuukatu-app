export const FormInputState: FormInputPostType = {
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
  taskFlow: {
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
}

export const FormInputReducer = (
  postState: FormInputPostType,
  action:
    | SetCompanyAction
    | SetMypageAction
    | UpdateCompanyAction
    | ClearAction
    | UpdateMypageAction
    | InitalizePostAction
    | InitalizeTaskAction
    | SetTaskAction,
): FormInputPostType => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...postState,
        ...action.payload,
      }

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
        taskFlow: {
          customId: '',
          task: '',
          situation: '未完了',
          testFormat: '',
          date: '',
          limitDate: '',
          current: false,
          next: false,
          finished: false,
          edit: false,
        },
      }

    case 'SET_COMPANY':
      return {
        ...postState,
        customId: action.payload.customId,
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
        customId: action.payload.customId,
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

    case 'INITIALIZE_TASK':
      return {
        ...postState,
        taskFlow: action.payload,
      }

    case 'SET_TASK':
      return {
        ...postState,
        taskFlow: {
          ...postState.taskFlow,
          customId: action.payload.customId,
          date: action.payload.date,
          limitDate: action.payload.limitDate,
          [action.payload.name]: action.payload.value,
        },
      }

    default:
      return FormInputState
  }
}
