import styles from '../styles/components/Results.module.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface Props {
  onClose(input: any): void
  priceWithPlan?: number
  priceWithoutPlan?: number
}

export const Results: React.FC<Props> = ({ onClose, priceWithPlan, priceWithoutPlan }) => {
  const withPlanInReals = priceWithPlan?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const withoutPlanInReals = priceWithoutPlan?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.container}>
      <AiOutlineCloseCircle
        size={30}
        color={'#F47174'}
        className={styles.closeButton}
        onClick={onClose}
      />

      <h2>Com FaleMais</h2>
      <h1>{withPlanInReals}</h1>

      <h2>Sem FaleMais</h2>
      <h1>{withoutPlanInReals}</h1>
    </div>
  )
}
