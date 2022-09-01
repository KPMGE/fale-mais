export class PhonePlanNotFoundError extends Error {
  constructor() {
    super('phone plan not found!')
    this.name = 'PhonePlanNotFoundError'
  }
}
