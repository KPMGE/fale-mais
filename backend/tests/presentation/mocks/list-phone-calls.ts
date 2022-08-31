import { PhoneCall } from "../../../src/domain/entities"
import { ListPhoneCallsUseCase } from "../../../src/domain/useCases"
import { makeFakePhoneCall } from "../../domain/mocks"

export class ListPhoneCallsServiceStub implements ListPhoneCallsUseCase {
  private fakePhoneCall = {
    ...makeFakePhoneCall(),
    id: 'any id'
  }
  output = [this.fakePhoneCall, this.fakePhoneCall, this.fakePhoneCall]
  async list(): Promise<PhoneCall[]> {
    return this.output
  }
}
