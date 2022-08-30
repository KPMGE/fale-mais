export class InvalidDDDError extends Error {
  constructor(invalidDDD: string) {
    super(`${invalidDDD} is not a valid DDD!`)
    this.name = 'InvalidDDDError '
  }
}

