'use client'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { postReducer } from '../reducer/PostReducer'

interface PostContextType {
  postsState: PostType[]
  postsDispatch: Dispatch<Action>
  posts: PostType[]
  setPosts: Dispatch<SetStateAction<PostType[]>>
  selectPost: PostType | null
  setSelectPost: Dispatch<SetStateAction<PostType | null>>
  selectTask: TaskType | null
  setSelectTask: Dispatch<SetStateAction<TaskType | null>>
  currentTask: TaskType | undefined
  finishedTasks: TaskType[] | undefined
  prevTask: TaskType | undefined
}
const postContext = createContext<PostContextType | undefined>(undefined)

export const usePost = () => {
  const context = useContext(postContext)
  if (!context) {
    throw new Error('context is undefined')
  }
  return context
}

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [postsState, postsDispatch] = useReducer(postReducer, [])
  const [selectPost, setSelectPost] = useState<PostType | null>(null)
  const [selectTask, setSelectTask] = useState<TaskType | null>(null)
  const currentTask = selectPost?.taskFlow?.filter((task) => task.finished === false)[0]
  // const prevTaskIndex = selectPost?.taskFlow?.filter((task) => task.finished === true).length;
  const finishedTasks = selectPost?.taskFlow?.filter((task) => task.finished === true)
  const prevTask = finishedTasks?.slice(-1)[0]

  useEffect(() => {
    setSelectTask(currentTask as TaskType)
  }, [currentTask, selectPost?.taskFlow, setSelectTask])

  const value = {
    postsState,
    postsDispatch,
    posts,
    setPosts,
    selectPost,
    setSelectPost,
    selectTask,
    setSelectTask,
    currentTask,
    finishedTasks,
    prevTask,
  }
  return <postContext.Provider value={value}>{children}</postContext.Provider>
}
