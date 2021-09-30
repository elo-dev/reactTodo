import React, { useEffect, useState } from 'react'
import './FontAwesomeIcons/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List } from './components/List/List'
import { AddButtonList } from './components/AddButtonList/AddButtonList'
import { Tasks } from './components/Tasks/Tasks'
import axios from 'axios'

const App = () => {
  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => setLists(data))
    axios
      .get('http://localhost:3001/colors')
      .then(({ data }) => setColors(data))
  }, [])

  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    setLists(newList)
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: <FontAwesomeIcon icon={('fas', 'list-ul')} size="1x" />,
              name: 'Все задачи',
              active: true,
            },
          ]}
        />
        {lists ? (
          <List
            isRemovable
            onRemove={id => {
              const newList = lists.filter(item => item.id !== id)
              setLists(newList) 
            }}
            items={lists}
          />
        ) : (
          'Загрузка'
        )}
        <AddButtonList onAddList={onAddList} colors={colors} />
      </div>
      {lists && <Tasks list={lists[1]} />}
    </div>
  )
}

export default App