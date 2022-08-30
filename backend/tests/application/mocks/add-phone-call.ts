import { AddPhoneCallRepository } from "../../../src/application/repositories/add-phone-call"
import { PhoneCall } from "../../../src/domain/entities"

export class AddPhoneCallRepositorySpy implements AddPhoneCallRepository {
  input = null
  output = null
  async add(newCall: PhoneCall): Promise<PhoneCall> {
    this.input = this.output = newCall
    return this.output
  }
}
