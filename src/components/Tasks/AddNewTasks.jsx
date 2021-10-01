import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import './Tasks.scss'

export const AddNewTasks = ({ list, onAddTask }) => {
  const [activeField, setActiveField] = useState(false)
  const [inputField, setInputField] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleField = () => {
    setActiveField(!activeField)
    setInputField('')
  }

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputField,
      completed: false,
    }
    setIsLoading(true)
    axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
      onAddTask(list.id, data)
      toggleField()
    }).catch(() => {
        alert('Ошибка при добавлении таски') 
    }).finally(() => {
        setIsLoading(false)
    })
  }

  return (
    <div className="tasks__form">
      {!activeField ? (
        <div className="tasks__form-new" onClick={toggleField}>
          <FontAwesomeIcon icon="plus" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-field">
          <input
            value={inputField}
            className="inputField"
            placeholder="Текст задачи"
            type="text"
            onChange={(e) => setInputField(e.target.value)}
          />
          <button disabled={isLoading} className="button" onClick={addTask}>
            {isLoading ? 'Добавление' : 'Добавить задачу'} 
          </button>
          <button className="button button--grey" onClick={toggleField}>
            Отмена
          </button>
        </div>
      )}
    </div>
  )
}
