import { useState } from 'react'

function TaskForm(props) {

  const [formData, setFormData] = useState({
    text: "",
    isCompleted: false
  })

  const handleChange = e => {
    const {name, value} = e.target
    setFormData( prevFormData => {
        return {
            ...prevFormData,
            [name]: value,
          };
    })

  }

  const handleKey = e => {
    if(e.key == 'Enter'){
        e.preventDefault()
        props.onClick(formData)
        setFormData({text:""})
    }
  }

  return (
    <form className='taskform'>
        <input 
        type="text" 
        name="text"
        placeholder="What to do?"
        maxLength="65"
        value = {formData.text}
        onChange={handleChange}
        onKeyDown={handleKey}
        />
    </form>
  )
}

export default TaskForm