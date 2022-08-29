export class DuplicatePlanDurationError extends Error {
  constructor() {
    super('DuplicatePlanDuration ')
    this.message = 'There is a plan with this duration already!'
    this.name = 'DuplicatePlanDuration'
  }
}
