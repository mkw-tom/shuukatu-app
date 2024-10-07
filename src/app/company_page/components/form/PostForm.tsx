'use client'
import { usePostReducer } from '../../context/useFormInputReducer'
import CompanyForm from './CompanyForm'
import MypageForm from './MypageForm'
import TaskForm from './TaskForm'

const PostForm = ({
  open,
  setOpen,
  title,
  onlyTaskForm,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  onlyTaskForm: boolean
}) => {
  const { formSlide, setFormSlide } = usePostReducer()

  return (
    <div className={`${open ? 'fixed' : 'hidden'} inset-0 z-50 bg-black bg-opacity-40`}>
      <div className="card mx-auto mt-20 h-auto w-96 overflow-hidden bg-white ">
        <div
          // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
          className={`flex flex-row ${onlyTaskForm ? '-translate-x-[768px] ' : formSlide}`}
          style={{ width: 'calc(100% * 3)' }}
        >
          <CompanyForm setOpen={setOpen} title={title} />
          <MypageForm setOpen={setOpen} title={title} />
          <TaskForm setOpen={setOpen} title={title} onlyTaskForm={onlyTaskForm} />
        </div>
      </div>
    </div>
  )
}

export default PostForm
