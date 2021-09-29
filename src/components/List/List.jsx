import React from 'react'
import './List.scss'
import classNames from 'classnames'
import { Badge } from '../Badge/Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const List = ({ items, onClick, isRemovable, onRemove }) => {
  return (
    <ul onClick={onClick} className='menuList'>
      {items.map((item, index) => (
        <li key={index} className={classNames(item.className, {'active': item.active})}>
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
          {isRemovable && <FontAwesomeIcon icon={'trash'} className='menuList__removeIcon' onClick={()=>onRemove(item)} />}
        </li>
      ))}
    </ul>
  )
}