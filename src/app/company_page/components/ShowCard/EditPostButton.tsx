import { Edit } from '@mui/icons-material'

const EditPostButton = () => {
  return (
    <button className="btn  btn-link btn-sm mr-auto text-gray-400 hover:text-info">
      <Edit style={{ fontSize: '20px' }} />
      編集
    </button>
  )
}

export default EditPostButton
