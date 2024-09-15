'use client'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

interface PostContextType {
  posts: PostType[]
  setPosts: Dispatch<SetStateAction<PostType[]>>
  selectPost: PostType | null
  setSelectPost: Dispatch<SetStateAction<PostType | null>>
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
  const [selectPost, setSelectPost] = useState<PostType | null>(null)

  const value = {
    posts,
    setPosts,
    selectPost,
    setSelectPost,
  }
  return <postContext.Provider value={value}>{children}</postContext.Provider>
}
