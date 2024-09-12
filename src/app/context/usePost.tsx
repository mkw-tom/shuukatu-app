'use client'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useState } from 'react'

interface PostContextType {
  post: PostType[]
  setPost: Dispatch<SetStateAction<PostType[]>>
}
const postContext = createContext<PostContextType | undefined>(undefined)

export const usePost = () => {
  const context = useContext(postContext)
  if (!context) {
    throw new Error('context is undefined')
  }
  return context
}

export const PostContexgtProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<PostType[]>([])

  const value = {
    post,
    setPost,
  }
  return <postContext.Provider value={value}>{children}</postContext.Provider>
}
