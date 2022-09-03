import { DropDownMenu } from "./DropDownMenu"
import styles from '../styles/components/DropDownList.module.scss'

interface Props {
  originDDDs: string[]
  destinationDDDs: string[]
  plans: string[]
}

export const DropDownList: React.FC<Props> = ({ plans, originDDDs, destinationDDDs }) => {
  return (
    <div className={styles.container}>
      <DropDownMenu defaultValue="Origem" elements={originDDDs} />
      <DropDownMenu defaultValue="Destino" elements={destinationDDDs} />
      <DropDownMenu defaultValue="Plano" elements={plans} />
    </div>
  )
}
