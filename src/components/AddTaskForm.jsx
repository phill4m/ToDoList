import Button from "./Button"
import Field from "./Field"

const AddTaskForm = () => {
    return (
        <form className="todo__form">
            <Field 
            className = "todo__field"
            label = "New tast title"
            id = "new-task"
            />
            <Button />
        </form>
    )
}

export default AddTaskForm