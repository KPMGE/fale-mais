import { readFileSync } from 'fs'
import { pool } from '../../infrastructure/repositories/postgres'
import { saveCsvPlansToPostgres, saveCsvPricesToPostgres } from '../helpers/save-csv-postgres'

export const setupPostgresDb = async () => {
  await pool.connect()
  console.log('database connected!')

  const phoneCallSql = readFileSync('./src/infrastructure/repositories/postgres/schemas/phone-call.sql', 'utf8')
  const phonePlanSql = readFileSync('./src/infrastructure/repositories/postgres/schemas/phone-plan.sql', 'utf8')

  // creates phone call table using the query
  try {
    await pool.query(phoneCallSql)
    console.log('phone calls table created!')
  } catch (error) {
    console.error(error.message)
  }

  // creates phone call table using the query
  try {
    await pool.query(phonePlanSql)
    console.log('phone plans table created!')
  } catch (error) {
    console.error(error.message)
  }

  // saves call prices from the .csv file
  await saveCsvPricesToPostgres('assets/prices.csv')
  console.log('Csv calls saved to postgres!')

  // saves call plans from the .csv file
  await saveCsvPlansToPostgres('assets/prices.csv')
  console.log('Csv plans saved to postgres!')
}
