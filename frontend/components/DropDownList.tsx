import { DropDownMenu } from "./DropDownMenu"
import styles from '../styles/components/DropDownList.module.scss'

export const DropDownList = () => {
  return (
    <div className={styles.container}>
      <DropDownMenu defaultValue="Origem" elements={['011', '015', '024', '034']} />
      <DropDownMenu defaultValue="Destino" elements={['011', '015', '024', '034']} />
      <DropDownMenu defaultValue="Plano" elements={['FaleMais 30', 'FaleMais 60', 'FaleMais130']} />
    </div>
  )
}
