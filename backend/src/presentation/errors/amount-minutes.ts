export class InvalidAmountMinutesError extends Error {
  constructor() {
    super('amount minutes must be greater than 0!')
    this.name = 'InvalidAmountMinutesError'
  }
}
