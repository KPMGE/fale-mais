export class PhoneCallNotFoundError extends Error {
  constructor() {
    super('phone call not found!')
    this.name = 'PhoneCallNotFoundError'
  }
}
