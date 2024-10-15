import type { Action } from '@/types/reducerType'

export const postReducer = (state: PostType[], action: Action): PostType[] => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.posts

    case 'ADD_POST':
      return [...state, action.post]

    case 'UPDATE_POST':
      return state.map((post) =>
        post.customId === action.postId ? { ...post, ...action.updatedPost } : post,
      )

    case 'DELETE_POST':
      return state.filter((post) => post.customId !== action.postId)

    case 'ADD_TASK':
      return state.map((post) => {
        if (post.customId === action.postId) {
          return {
            ...post,
            taskFlow: [...post.taskFlow, action.newTask], // 不変性を保ちながら新しいタスクを追加
          }
        }
        return post
      })

    case 'UPDATE_TASK':
      return state.map((post) => {
        if (post.customId === action.postId) {
          console.log('Updating task for post:', post) // デバッグ用
          return {
            ...post,
            taskFlow: post.taskFlow.map((task) => {
              if (task.customId === action.taskId) {
                console.log('Updating task:', task) // デバッグ用
                return { ...task, ...action.updateTask }
              }
              return task
            }),
          }
        }
        return post
      })

    case 'DELETE_TASK':
      return state.map((post) => {
        if (post.customId === action.postId) {
          return {
            ...post,
            taskFlow: post.taskFlow.filter((task) => task.customId !== action.taskId),
          }
        }
        return post
      })

    case 'SWITCH_TASK':
      return state.map((post) => {
        if (post.customId === action.postId) {
          return {
            ...post,
            taskFlow: action.switchedData,
          }
        }
        return post
      })

    case 'ONLY_COMPLETED':
      return state.filter((post) => post.completed === true)

    case 'ONLY_FAILED':
      return state.filter((post) => post.failed === true)

    case 'SEARCH_POST':
      return state.filter((post) =>
        post.name.toLowerCase().includes(action.searchText.toLowerCase() as string),
      )

    default:
      return state
  }
}
