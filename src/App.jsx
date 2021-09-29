import React, { useState } from 'react'
import './FontAwesomeIcons/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.scss'
import { List } from './components/List/List'
import { AddButtonList } from './components/AddButtonList/AddButtonList'
import db from './assets/db.json'

const App = () => {

  const [lists, setLists] = useState(db.lists.map(item => {
    item.color = db.colors.filter(color => color.id === item.colorId)[0].name
    return item
  }))

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    setLists(newList)
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: <FontAwesomeIcon icon={('fas', 'list-ul')} size="1x" />,
            name: 'Все задачи',
            active: true
          }
        ]} />
        <List isRemovable onRemove={(item)=> console.log(item)} items={lists} />
        <AddButtonList onAddList={onAddList} colors={db.colors} />
      </div>
    </div>
  )
}

export default App