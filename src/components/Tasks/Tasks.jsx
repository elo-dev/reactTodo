import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tasks.scss'

export const Tasks = ({ list }) => {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <FontAwesomeIcon icon={'pen'} />
      </h2>

      {list.tasks.map(task => (
        <div key={task.id} className="tasks__items">
          <div className="checkbox">
            <input id={`task-${task.id}`} type="checkbox" />
            <label htmlFor={`task-${task.id}`}>
              <FontAwesomeIcon icon={'check'} />
            </label>
          </div>
          <input value={task.text} />
        </div>
      ))}
    </div>
  )
}
