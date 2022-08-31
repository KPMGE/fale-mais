import { ListPhoneCallsRepository } from "../../../src/application/repositories"
import { PhoneCall } from "../../../src/domain/entities"
import { makeFakePhoneCall } from "../../domain/mocks"

export class ListPhoneCallsRepositoryStub implements ListPhoneCallsRepository {
  private fakePhoneCall: PhoneCall = {
    ...makeFakePhoneCall(),
    id: 'any id'
  }
  output = [this.fakePhoneCall, this.fakePhoneCall, this.fakePhoneCall]

  async list(): Promise<PhoneCall[]> {
    return this.output
  }
}
