import Swal from "sweetalert2"

type Value = string | number | undefined

export const checkFields = (...values: Value[]): boolean => {
  for (const value of values) {
    if (!value || value === -1 || value === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please, fill in all the fields!',
      })
      return false
    }
  }
  return true
}
