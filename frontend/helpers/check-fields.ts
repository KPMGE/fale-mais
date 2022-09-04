import { alerError } from "./alert-error"

type Value = string | number | undefined

export const checkFields = (...values: Value[]): boolean => {
  for (const value of values) {
    if (!value || value === -1 || value === '') {
      alerError('Please, fill in all the fields!')
      return false
    }
  }
  return true
}
