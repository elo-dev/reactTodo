import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Tasks.scss'

export const Task = ({ task }) => {
  return (
    <div key={task.id} className="tasks__items">
      <div className="checkbox">
        <input id={`task-${task.id}`} type="checkbox" />
        <label htmlFor={`task-${task.id}`}>
          <FontAwesomeIcon icon={'check'} />
        </label>
      </div>
      <input readOnly value={task.text} className="inputField" />
      <div className="tasks__items-edit">
        <FontAwesomeIcon icon="edit" />
      </div>
      <div className="tasks__items-delete">
        <FontAwesomeIcon icon="trash" />
      </div>
    </div>
  )
}
