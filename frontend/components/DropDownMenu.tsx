import React, { useState } from 'react'
import styles from '../styles/components/DropDownMenu.module.scss'

type Props = {
  defaultValue: string
  elements: string[]
  onSelect(item: string): void
}

export const DropDownMenu: React.FC<Props> = ({ elements, defaultValue, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<string>(defaultValue)

  const clickHandler = (element: string) => {
    setSelectedItem(element)
    onSelect(element)
  }

  return (
    <div className={styles.drop}>
      {selectedItem}
      <ul>
        {elements.map(element => {
          return (
            <button key={element} onClick={() => clickHandler(element)}>
              {element}
            </button>
          )
        })
        }
      </ul>
    </div>
  )
}
