const ToDoInfo = (props) => {
  const {
    total,
    done,
  } = props

  const hasTasks = total > 0
    return(
        <div className="todo__info">
          <div className="todo__total-tasks">
            Сделано {done} из {total}
          </div>
          {hasTasks && <button className="todo__delete-all-button" type="button">Удалить все</button>}
        </div>
    )
}
export default ToDoInfo