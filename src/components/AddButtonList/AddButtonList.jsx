import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List } from '../List/List'
import './AddButtonList.scss'
import { Badge } from '../Badge/Badge'

export const AddButtonList = ({ colors, onAddList }) => {
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[0].id)
  const [inputValue, setInputValue] = useState('')

  const resetPopup = () => {
    setInputValue('')
    setVisiblePopup(false)
    setSelectedColor(colors[0].id)
  }

  const addList = () => {
    if(!inputValue){
      alert('Введите название списка')
      return
    }
    onAddList({id: Math.random(), name: inputValue, color: colors.filter(c => c.id === selectedColor)[0].name})
    resetPopup()
  }

  return (
    <div className="addList">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'menuList__addFolder',
            icon: (
              <FontAwesomeIcon icon={'folder-plus'} className="folderPlus" />
            ),
            name: 'Добавить папку',
          },
        ]}
      />
      {visiblePopup && (
        <div className="addList__popup">
          <FontAwesomeIcon onClick={resetPopup} icon={'times-circle'} className="addList__popup-closeBtn" />
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className={'inputField'}
            type="text"
            placeholder="Название папки"
          />
          <div className="addList__popup-colors">
            {colors.map((color) => (
              <Badge
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className={'button'}>Добавить</button>
        </div>
      )}
    </div>
  )
}
