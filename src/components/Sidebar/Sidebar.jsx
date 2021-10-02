import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useHistory } from 'react-router'
import { AddButtonList } from '../AddButtonList/AddButtonList'
import { List } from '../List/List'
import './Sidebar.scss'

export const Sidebar = ({ lists, activeItem, setLists, colors }) => {
  const history = useHistory()

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    setLists(newList)
  }

  return (
    <div className="sidebar">
      <List
        onClickItem={(list) => history.push('/')}
        items={[
          {
            active: history.location.pathname === '/',
            icon: <FontAwesomeIcon icon={('fas', 'list-ul')} size="1x" />,
            name: 'Все задачи',
          },
        ]}
      />
      {lists ? (
        <List
          isRemovable
          onClickItem={(list) => {
            history.push(`/lists/${list.id}`)
          }}
          activeItem={activeItem}
          onRemove={(id) => {
            const newList = lists.filter((item) => item.id !== id)
            setLists(newList)
          }}
          items={lists}
        />
      ) : (
        'Загрузка'
      )}
      <AddButtonList onAddList={onAddList} colors={colors} />
    </div>
  )
}
