export class PhonePlanNotFoundError extends Error {
  constructor() {
    super('phone not found!')
    this.name = 'PhonePlanNotFoundError'
  }
}
