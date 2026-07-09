import Button from "./Button"
import Field from "./Field"

const AddTaskForm = () => {
    return (
        <form className="todo__form">
            <Field 
            className = "todo__field"
            label = "Новая задача"
            id = "new-task"
            />
            <Button type="submit">Добавить</Button>
        </form>
    )
}

export default AddTaskForm