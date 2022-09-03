import styles from '../styles/components/Results.module.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface Props {
  onClose(input: any): void
  priceWithPlan: number
  priceWithoutPlan: number
}

export const Results: React.FC<Props> = ({ onClose, priceWithPlan, priceWithoutPlan }) => {
  return (
    <div className={styles.container}>
      <AiOutlineCloseCircle
        size={30}
        color={'#6750A4'}
        className={styles.closeButton}
        onClick={onClose}
      />

      <h2>Com FaleMais</h2>
      <h1>R${priceWithPlan}</h1>

      <h2>Sem FaleMais</h2>
      <h1>R${priceWithoutPlan}</h1>
    </div>
  )
}
