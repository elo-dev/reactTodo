import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tasks.scss'
import axios from 'axios'
import { AddNewTasks } from './AddNewTasks'

export const Tasks = ({ list, onEditTitle, onAddTask }) => {

  const editTitle = () => {
    const newTitle = window.prompt('Название папки', list.name)
    if(newTitle){
      onEditTitle(list.id, newTitle)
      axios.patch('http://localhost:3001/lists/' + list.id, {
        name: newTitle
      }).catch(() => {
        alert('Не удалось изменить Title')
      })
    }
  }

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <FontAwesomeIcon icon={'pen'} onClick={editTitle} />
      </h2>
      
      {!list.tasks.length && <h2 className='tasks__empty'>Задачи отсутствуют</h2>}
      {list.tasks.map(task => (
        <div key={task.id} className="tasks__items">
          <div className="checkbox">
            <input id={`task-${task.id}`} type="checkbox" />
            <label htmlFor={`task-${task.id}`}>
              <FontAwesomeIcon icon={'check'} />
            </label>
          </div>
          <input value={task.text} className='inputField' />
        </div>
      ))}
      <AddNewTasks list={list} onAddTask={onAddTask} />
    </div>
  )
}
