import { readFileSync } from 'fs'
import { pool } from '../../infrastructure/repositories/postgres'

export const setupPostgresDb = async () => {
  await pool.connect()
  console.log('database connected!')

  const phoneCallSql = readFileSync('./src/infrastructure/repositories/postgres/schemas/phone-call.sql', 'utf8')
  const phonePlanSql = readFileSync('./src/infrastructure/repositories/postgres/schemas/phone-plan.sql', 'utf8')

  try {
    await pool.query(phoneCallSql)
    console.log('phone calls table created!')
  } catch (error) {
    console.error(error.message)
  }

  try {
    await pool.query(phonePlanSql)
    console.log('phone plans table created!')
  } catch (error) {
    console.error(error.message)
  }
}
