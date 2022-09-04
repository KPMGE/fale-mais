import Swal from "sweetalert2"

export const alerError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  })
}
