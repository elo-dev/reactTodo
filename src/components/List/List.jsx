import React from 'react'
import './List.scss'
import classNames from 'classnames'
import { Badge } from '../Badge/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

export const List = ({ items, onClick, isRemovable, onRemove, onClickItem, activeItem }) => {

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
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={classNames(item.className, {
             active: item.active 
             ? item.active 
             : activeItem && activeItem.id === item.id 
            })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>
          {item.tasks && `${item.tasks.length}` && `(${item.tasks.length})`}
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
