interface PostType extends Document {
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
  taskFlow: [
    {
      customId: string
      task: string
      situation: string
      testFormat: string
      date: string
      limitDate: string
      current: boolean
      next: boolean
      finished: boolean
      edit: boolean
    },
  ]
  createdAt: Date
  updatedAt: Date
}
