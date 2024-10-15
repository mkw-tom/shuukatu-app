import { z } from 'zod'
export const loginValidationSchema = z.object({
  username: z
    .string()
    .min(1, 'ユーザーネームは必須入力です')
    .min(2, '名前は2文字以上で入力してください。'),
  email: z
    .string()
    .min(1, 'メールアドレスは必須入力です')
    .email('正しいメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードは必須入力です')
    .min(6, 'パスワードは6文字以上で入力してください。')
    .max(15, '15字以内で入力してください'),
})

export const companyFormValidatioinSchema = z.object({
  name: z.string().min(1, '企業名は必須入力です').max(15, '15字以内で入力してください'),
  event: z.string().min(1, 'イベントは必須入力です'),
  startDate: z.string().min(1, '開催日時は必須入力です'),
  // endDate: z.string().min(1, '開催日時は必須入力です'),
  region: z.string().min(1, '開催地は必須入力です').max(10, '10字以内で入力してください'),
})

export const mypageFormValidationSchema = z.object({
  url: z.string().min(1, 'URLは必須入力です'),
  id: z.string().min(1, 'IDは必須入力です').max(25, '25字以内で入力してください'),
  password: z.string().min(1, 'Passwordは必須入力です').max(25, '25字以内で入力してください'),
})

export const taskFormValidationSchema = z.object({
  task: z.string().min(1, 'タスク名は必須入力です'),
  date: z.string().min(1, '実践日時は必須入力です'),
  limitDate: z.string(),
  testFormat: z.string().max(15, '15字以内で入力してください'),
})
