import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Tasks.scss'

export const Task = ({ id, text, list, onEditText, onRemove, onComplete, completed }) => {

  const onChangeCheckbox = e => {
    onComplete(list.id, id, e.target.checked)
  }

  return (
    <div key={id} className="tasks__items">
      <div className="checkbox">
        <input id={`task-${id}`} type="checkbox" onChange={onChangeCheckbox} checked={completed} />
        <label htmlFor={`task-${id}`}>
          <FontAwesomeIcon icon={'check'} />
        </label>
      </div>
      <p className="inputField">{text}</p>
      <div className="tasks__items-edit">
        <FontAwesomeIcon icon="edit" onClick={() => onEditText(list.id, { id, text })} />
      </div>
      <div className="tasks__items-delete">
        <FontAwesomeIcon icon="trash" onClick={() => onRemove(list.id, id)} />
      </div>
    </div>
  )
}
