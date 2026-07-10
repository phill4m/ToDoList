import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"

const ToDo = () => {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      return JSON.parse(savedTasks)
    }
    return [
      { id: 'task-1', title: 'Покушать', isDone: false },
      { id: 'task-2', title: 'Погулять', isDone: true },
    ]

  })

  const [newTaskTitle, setNewTaskTitle] = useState()

  const newTaskInputRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState('')

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Уверены?')
    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks(
      tasks.filter((task) => task.id != taskId)
    )
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id == taskId) {
          return { ...task, isDone }
        }

        return task
      })
    )
  }, [tasks])

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now.toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks((prevTasks) => [...prevTasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }
  }, [newTaskTitle])


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, [])


  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
      : null
  }, [searchQuery, tasks])

  const doneTasks = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length
  }, [tasks])

  return (
    <div className="todo">
      <h1 className="todo__title">Список задач</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ToDoInfo
        total={tasks.length}
        done={doneTasks}
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