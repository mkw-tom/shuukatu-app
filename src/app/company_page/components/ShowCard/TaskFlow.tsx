'use client'
import PostForm from '@/components/form/PostForm'
import {
  AssignmentInd,
  Celebration,
  CheckCircle,
  Delete,
  Edit,
  Group,
  Person,
  Verified,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'

const judgeIcon = (taskname: string) => {
  switch (taskname) {
    case 'ES・履歴書提出':
      return <AssignmentInd />
    case '面接':
      return <Person />
    case 'グループ面接':
      return <Group />
  }

  // const selectPostTasks = [
  //   { task: 'グループ面接', unfinishIcon: <Group className="text-gray-400"/>, doIcon: <Group className="animate-pulse text-info"/>, finishedIcon: <Check className="text-info"/> },
  //   { task: '面接', unfinishIcon: <Person className="text-gray-400"/>, doIcon: <Person className="animate-pulse text-info"/>, finishedIcon: <Check className="text-info"/> },
  //   { task: 'ES・履歴書提出', unfinishIcon: <AssignmentInd className="text-gray-400"/>,  doIcon: <AssignmentInd className="animate-pulse text-info"/>, finishedIcon: <Check className="text-info"/>  },
  // ]
}

const dummyTaskFlow = [
  {
    customId: 'aaiueo',
    task: 'グループ面接',
    date: '10:00',
    limitDate: '11;00',
    testFormat: 'spi',
    situation: '未完了',
    finished: true,
    current: false,
    next: false,
    edit: false,
  },
  {
    customId: 'aaiueo',
    task: 'グループ面接',
    date: '10:00',
    limitDate: '11;00',
    testFormat: 'spi',
    situation: '未完了',
    finished: false,
    next: false,
    current: true,
    edit: false,
  },
  {
    customId: 'aaiueo',
    task: '面接',
    date: '10:00',
    limitDate: '11;00',
    testFormat: 'spi',
    situation: '未完了',
    finished: false,
    current: false,
    next: true,
    edit: false,
  },
  {
    customId: 'aaiueo',
    task: 'ES・履歴書提出',
    date: '10:00',
    limitDate: '11;00',
    testFormat: 'spi',
    situation: '未完了',
    finished: false,
    current: false,
    next: false,
    edit: false,
  },
  {
    customId: 'aaiueo',
    task: 'グループ面接',
    date: '10:00',
    limitDate: '11;00',
    testFormat: 'spi',
    situation: '未完了',
    finished: false,
    current: false,
    next: false,
    edit: false,
  },
  {
    customId: 'aaiueo',
    task: 'グループ面接',
    date: '10:00',
    limitDate: '11;00',
    testFormat: 'spi',
    situation: '未完了',
    finished: false,
    current: false,
    next: false,
    edit: false,
  },
]

const TaskFLow = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectTask, setSelectTask] = useState<TaskStateType | null>(null)

  const TaskDelete = async (taskId: string) => {
    const postId = 'test111'
    const res = fetch(`http://localhost:3000/api/posts/task?postId=${postId}&taskId=${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
    })
  }

  const TaskEdit = async () => {
    const postId = 'test111'
    const res = fetch('http://localhost:3000/api/posts/task/update', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // JSONデータを送ることを明示
      },
      body: JSON.stringify({
        customId: 'test',
        taskFlow: 'diha@f',
      }),
    })
  }

  const toggle = () => {
    setOpen(!open)
  }
  useEffect(() => {
    setSelectTask(dummyTaskFlow[0])
  }, [])

  const handleSelectTask = (task: TaskStateType) => {
    setSelectTask(task)
  }

  return (
    <div className="mt-5 flex w-full flex-col">
      <PostForm open={open} setOpen={setOpen} title="編集" onlyTaskForm={true} />
      <div className="mb-1 flex justify-between">
        <h2 className="block h-6 border-l-2 border-l-info pl-2">選考フロー</h2>
      </div>
      <div className="h-auto max-h-[300px] w-full overflow-x-scroll">
        <ul className="timeline timeline-horizontal mb-5 flex lg:ml-0">
          {dummyTaskFlow.map((task, index) => (
            <li key={index}>
              <hr className={`${task.finished ? 'bg-info' : ''} ${index === 0 ? 'hidden' : ''}`} />
              <div className="timeline-middle">
                <CheckCircle className={`${task.finished ? 'text-info' : 'text-gray-400'}`} />
              </div>
              <button
                className={`timeline-end timeline-box flex cursor-pointer items-center gap-1 hover:bg-gray-300 ${task === selectTask ? 'bg-gray-300' : ''}`}
                onClick={() => handleSelectTask(task)}
              >
                <span className={`${task.finished ? 'text-info' : 'text-gray-500'}`}>
                  {judgeIcon(task.task)}
                </span>
                <span className={`${task.finished ? 'text-info' : 'text-gray-500'} `}>
                  {task.task}
                </span>
              </button>
              <hr className={`${task.finished ? 'bg-info' : ''} ${index === -1 ? 'hidden' : ''}`} />
            </li>
          ))}
          <li>
            <hr />
            <div className="timeline-middle">
              <Verified className="text-orange-500" />
            </div>
            <div className="timeline-end timeline-box text-orange-500">
              <Celebration className="flex items-center gap-1 text-orange-500" />
              <span>内定・参加確定</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-3 flex w-full flex-col gap-1 rounded-md border-2 p-2">
        <div className="flex justify-between">
          <h3 className="flex items-center gap-2 border-l-2 border-l-info pl-2">
            <span className="text-info">{judgeIcon(selectTask?.task as string)}</span>
            <span className="text-info">{selectTask?.task as string}</span>
          </h3>
          <nav className="flex items-center">
            <button
              className="btn  btn-link btn-sm text-gray-400 hover:text-info"
              onClick={() => setOpen(true)}
            >
              <Edit style={{ fontSize: '20px' }} />
              編集
            </button>
            <button className="btn btn-link btn-sm text-gray-400 hover:text-error">
              <Delete style={{ fontSize: '20px' }} />
              削除
            </button>
          </nav>
        </div>
        <p className="border-l-2 border-l-info pl-2">テスト形式：{selectTask?.testFormat}</p>
        <p className="border-l-2 border-l-info pl-2">実践日時：{selectTask?.date}</p>
        <p className="border-l-2 border-l-info pl-2">期限：{selectTask?.limitDate}</p>
      </div>
    </div>
  )
}

export default TaskFLow
