import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import Task from './components/task'
import './App.css'
import {v4 as uuidv4} from 'uuid'

function App() {
  
  
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  const createTask = task => {
    setTasks(prevTasks => {
      return [...prevTasks, {
        id:uuidv4(),
        ...task
      }]
    })
  }

  const deleteTask = id => {
    setTasks(prevTasks => prevTasks.filter(task => task.id!==id))
  }
  
  const editTask = (newText, id) => {
    setTasks(prevTasks => prevTasks.map(task => {
      return task.id === id ? {...task, text:newText} : task
    }))
  }


  
  const toggleStatus = id => {
    setTasks(prevTasks => prevTasks.map(task => {
      return task.id === id ? {...task, isCompleted: !task.isCompleted} : task
    })
    )
  }
  const taskElements = tasks.map(task => (
    <Task 
      key={task.id}
      text={task.text}
      isCompleted={task.isCompleted}
      onClick = {() => toggleStatus(task.id)}
      deleteTask = {() => deleteTask(task.id)}
      editTask = {newText => editTask(newText, task.id)}
    />
  ))
  
  return (
    <div className='container'>
      <h1 className='mainheading'>To-Do List</h1>
      <div className='main'>
      <TaskForm onClick = {createTask} />
      <div className='taskcontainer'>
        {taskElements}
      </div>
      </div>
    </div>
  )
}

export default App
