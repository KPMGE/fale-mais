import React, { useState } from 'react'
import styles from '../styles/components/DropDownMenu.module.scss'

type Props = {
  defaultValue: string
  elements: string[]
}

export const DropDownMenu: React.FC<Props> = ({ elements, defaultValue }) => {
  const [selectedItem, setSelectedItem] = useState<string>(defaultValue)

  return (
    <div className={styles.drop}>
      {selectedItem}
      <ul>
        {elements.map(element => {
          return (
            <button key={element} onClick={() => setSelectedItem(element)}>
              {element}
            </button>
          )
        })
        }
      </ul>
    </div>
  )
}
