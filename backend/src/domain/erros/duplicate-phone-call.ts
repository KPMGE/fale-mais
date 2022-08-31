export class DuplicatePhoneCallError extends Error {
  constructor() {
    super('duplicate phone call!')
    this.name = 'DuplicatePhoneCallError'
  }
}
