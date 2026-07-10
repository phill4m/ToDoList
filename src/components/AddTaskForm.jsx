import Button from "./Button"
import Field from "./Field"

const AddTaskForm = (props) => {
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = props

    const onSumbit = (event) => {
        event.preventDefault()
        addTask()
    }


    return (
        <form className="todo__form" onSubmit={onSumbit}>
            <Field
                className="todo__field"
                label="Новая задача"
                id="new-task"
                value={newTaskTitle}
                onInput={(event) => setNewTaskTitle(event.target.value)}
                ref={newTaskInputRef}
            />
            <Button type="submit">Добавить</Button>
        </form>
    )
}

export default AddTaskForm