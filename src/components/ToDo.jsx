import { useState, useEffect } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"

const ToDo = () => {

const [tasks, setTasks] = useState( () => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks){
      return JSON.parse(savedTasks)
  }
  return [
    {id: 'task-1', title: 'Покушать', isDone: false},
    {id: 'task-2', title: 'Погулять', isDone: true},
  ]

})

const [newTaskTitle, setNewTaskTitle] = useState()

const [searchQuery, setSearchQuery] = useState('')

const deleteAllTasks = () => {
  const isConfirmed = confirm('Уверен?')
  if(isConfirmed){
    setTasks([])
  }
}

const deleteTask = (taskId) => {
  setTasks(
    tasks.filter((task) => task.id != taskId)
  )
}

const toggleTaskComplete = (taskId, isDone) => {
  setTasks(
    tasks.map((task) => {
      if (task.id == taskId){
        return { ...task, isDone}
      }

      return task
    })
  )
}

const addTask = () => {
  if (newTaskTitle.trim().length>0){
    const newTask = {
      id: crypto?.randomUUID() ?? Date.now.toString(),
      title: newTaskTitle,
      isDone: false,
    }
    setTasks([...tasks, newTask])
    setNewTaskTitle('')
  }
}


useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


const clearSearchQuery = searchQuery.trim().toLowerCase()
const filteredTasks = clearSearchQuery.length > 0
? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
: null

   
  return(
        <div className="todo">
      <h1 className="todo__title">Список задач</h1>
      <AddTaskForm 
      addTask={addTask}
      newTaskTitle={newTaskTitle}
      setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      />
      <ToDoInfo 
      total={tasks.length}
      done={tasks.filter(({isDone})=> isDone).length}
      onDeleteAllButtonClick={deleteAllTasks}
      />
      <ToDoList 
      tasks={tasks}
      filteredTasks={filteredTasks}
      onDeleteTaskButtonClick={deleteTask}
      onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
    )
}
export default ToDo