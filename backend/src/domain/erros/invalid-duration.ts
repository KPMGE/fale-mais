export class InvalidPlanDurationError extends Error {
  constructor() {
    super('InvalidPlanDurationError ')
    this.message = 'duration in minutes must be greater than 0!'
    this.name = 'InvalidPlanDurationError'
  }
}
