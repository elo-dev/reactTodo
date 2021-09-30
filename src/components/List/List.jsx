import React from 'react'
import './List.scss'
import classNames from 'classnames'
import { Badge } from '../Badge/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export const List = ({ items, onClick, isRemovable, onRemove }) => {

  const removeList = (item) => {
    if(window.confirm('Вы действительно хотите удалить папку ?')){
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id)
      })
    }
  }
 
  return (
    <ul onClick={onClick} className="menuList">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <FontAwesomeIcon
              icon={'trash'}
              className="menuList__removeIcon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
