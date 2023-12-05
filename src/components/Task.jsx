import { useState } from 'react'
import { MdEdit, MdDelete, MdCancel } from 'react-icons/md';

function Task(props) {

  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(props.text)


  const handleEditClick = (e) => {
    e.stopPropagation()
    setIsEditing(true)
  }
  const handleCancelClick = () => setIsEditing(false)
  const handleChange = (e) => setEditedText(e.target.value)
  const handleSave = (e) => {
    if(e.key === 'Enter'){
    props.editTask(editedText)
    setIsEditing(false)
    }
  }


  return (
    isEditing ? <div className="editinputconatiner">
      <input className='editinput' 
      type="text" 
      value={editedText} 
      onChange={handleChange} 
      onKeyDown={handleSave}
      maxLength="65"/> 
      <MdCancel onClick={handleCancelClick}/>
      </div> 
    :
    <div onClick={props.onClick} className={props.isCompleted ? 'completedtaskcard' : 'taskcard'}>
      <h2>{props.text}</h2>
      <div className='iconscontainer'>
        <MdEdit onClick={handleEditClick}/>
        <MdDelete onClick={props.deleteTask}/>
      </div>
    </div>  
  )
}

export default Task