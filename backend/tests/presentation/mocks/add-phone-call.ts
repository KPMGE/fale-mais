import { PhoneCall } from "../../../src/domain/entities"
import { AddPhoneCallUseCase } from "../../../src/domain/useCases"
import { makeFakePhoneCall } from "../../domain/mocks"

export class AddPhoneCallServiceMock implements AddPhoneCallUseCase {
  input = null
  output = { ...makeFakePhoneCall(), id: 'some id' }
  async add(newCall: AddPhoneCallUseCase.Props): Promise<PhoneCall> {
    this.input = newCall
    return this.output
  }
}
