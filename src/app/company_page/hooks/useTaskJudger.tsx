'use client'
import {
  AirlineSeatReclineExtra,
  AirlineSeatReclineNormal,
  AppRegistration,
  Assignment,
  Celebration,
  CheckCircle,
  CoPresent,
  Diversity3,
  Group,
  Terminal,
  Verified,
} from '@mui/icons-material'
import { usePost } from '../../state/context/usePost'

const useTaskJudger = () => {
  const { posts } = usePost()

  const currentTaskName = (post: PostType) => {
    if (!post?.taskFlow) return 'なし'
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    const prev = post?.taskFlow.filter((task) => task.finished === true).slice(-1)[0]

    if (!current && !post?.completed) {
      return prev?.task
    } else if (!current) {
      return '合格'
    } else if (current?.current) {
      return current?.task
    } else if (!current.current && prev) {
      return prev?.task
    } else {
      return 'なし'
    }
  }

  const currentTaskId = (post: PostType) => {
    if (!post?.taskFlow) return null
    const current = post?.taskFlow.filter((task) => task.finished === false)[0]
    const prev = post?.taskFlow.filter((task) => task.finished === true).slice(-1)[0]

    if (!current && !post?.completed) {
      return prev?.customId
    } else if (!current) {
      return null
    } else if (current?.current) {
      return current?.customId
    } else if (!current.current && prev) {
      return prev?.customId
    } else {
      return null
    }
  }

  const taskIconJudger = (taskName: string) => {
    switch (taskName) {
      case '説明会':
        return <CoPresent style={{ fontSize: '20px' }} className="mr-1 " />
      case 'ES・履歴書提出':
        return <Assignment style={{ fontSize: '20px' }} className="mr-1 " />
      case '適性検査':
        return <AppRegistration style={{ fontSize: '20px' }} className="mr-1 " />
      case 'コーディングテスト':
        return <Terminal style={{ fontSize: '20px' }} className="mr-1 " />
      case 'カジュアル面談':
        return <AirlineSeatReclineExtra style={{ fontSize: '20px' }} className="mr-1 " />
      case 'グループ面接':
        return <Group style={{ fontSize: '20px' }} className="mr-1 " />
      case 'グループディスカッション':
        return <Diversity3 style={{ fontSize: '20px' }} className="mr-1 " />
      case '一次面接' || '二次面接' || '三次面接' || '最終面接':
        return <AirlineSeatReclineNormal style={{ fontSize: '20px' }} className="mr-1 " />
      case '合格':
        return <Celebration style={{ fontSize: '20px' }} className="mr-1 text-orange-500" />
      default:
        return
    }
  }

  const taksStatusJudger = (post: PostType, taskId: string | null) => {
    const taskData = post.taskFlow.find((task) => task.customId === taskId)

    if (taskData?.failed) {
      return <p className="mx-auto size-5 rounded-full bg-red-500"></p>
    }

    if (taskData?.finished) {
      return <CheckCircle className="mx-auto w-full text-info" />
    }

    if (!taskData?.finished && taskData?.current) {
      return <p className="mx-auto size-5 animate-pulse rounded-full bg-info"></p>
    }

    if (post.completed) {
      return <Verified className="mx-auto w-full  text-orange-500" />
    }

    if (!taskData?.finished) {
      return <p className="mx-auto size-5 rounded-full bg-gray-300"></p>
    }

    if (!taskData) {
      return <p className="mx-auto size-5 rounded-full bg-gray-300"></p>
    }
  }

  return { taskIconJudger, taksStatusJudger, currentTaskName, currentTaskId }
}

export default useTaskJudger
