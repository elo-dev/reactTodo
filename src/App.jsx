import React, { useEffect, useState } from 'react'
import './FontAwesomeIcons/index'
import { Tasks } from './components/Tasks/Tasks'
import axios from 'axios'
import { Route, useLocation } from 'react-router'
import { Sidebar } from './components/Sidebar/Sidebar'

const App = () => {
  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  let location = useLocation()

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => setLists(data))
    axios
      .get('http://localhost:3001/colors')
      .then(({ data }) => setColors(data))
  }, [])

  const onAddTask = (listId, taskObj) => {
    const newTasks = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setLists(newTasks)
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title
      }
      return item
    })
    setLists(newList)
  }

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1]
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId))
      setActiveItem(list)
    }
  }, [lists, location.pathname])

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <Sidebar
          lists={lists}
          activeItem={activeItem}
          setLists={setLists}
          colors={colors}
        />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {lists &&
            lists.map((list) => (
              <Tasks
                key={list.id}
                list={list}
                onAddTask={onAddTask}
                onEditTitle={onEditListTitle}
                withoutEmpty
              />
            ))}
        </Route>
        <Route path="/lists/:id">
          {lists && activeItem && (
            <Tasks
              onAddTask={onAddTask}
              list={activeItem}
              onEditTitle={onEditListTitle}
            />
          )}
        </Route>
      </div>
    </div>
  )
}

export default App
