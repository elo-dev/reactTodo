import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tasks.scss'
import axios from 'axios'
import { AddNewTasks } from './AddNewTasks'
import { Link } from 'react-router-dom'
import { Task } from './Task'

export const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty }) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название папки', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось изменить Title')
        })
    }
  }

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 className="tasks__title" style={{ color: list.color.hex }}>
          {list.name}
          <FontAwesomeIcon icon={'pen'} onClick={editTitle} />
        </h2>
      </Link>

      {!withoutEmpty && !list.tasks.length && (
        <h2 className="tasks__empty">Задачи отсутствуют</h2>
      )}
      {list.tasks.map((task) => (
        <Task task={task} />
      ))}
      <AddNewTasks list={list} onAddTask={onAddTask} />
    </div>
  )
}
