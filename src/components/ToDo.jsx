import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"

const ToDo = () => {
  const tasks = [
    {id: 'task-1', title: 'Покушать', isDone: false},
    {id: 'task-2', title: 'Погулять', isDone: true},
  ]
    return(
        <div className="todo">
      <h1 className="todo__title">Список задач</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <ToDoInfo 
      total={tasks.length}
      done={tasks.filter(({isDone})=> isDone).length}
      />
      <ToDoList tasks={tasks} />
    </div>
    )
}
export default ToDo