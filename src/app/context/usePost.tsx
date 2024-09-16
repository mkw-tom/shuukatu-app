'use client'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useReducer, useState } from 'react'
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

  const value = {
    postsState,
    postsDispatch,
    posts,
    setPosts,
    selectPost,
    setSelectPost,
    selectTask,
    setSelectTask,
  }
  return <postContext.Provider value={value}>{children}</postContext.Provider>
}
