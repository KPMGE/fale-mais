import { GetPhoneCallByDDDRepository } from "../../../src/application/repositories"
import { PhoneCall } from "../../../src/domain/entities"
import { makeFakePhoneCall } from "../../domain/mocks"

export class GetPhoneCallByDDDRepositoryMock implements GetPhoneCallByDDDRepository {
  output = { ...makeFakePhoneCall(), id: 'any_id' }
  originDDD = ""
  destinationDDD = ""
  async getByDDD(originDDD: string, destinationDDD: string): Promise<PhoneCall> {
    this.originDDD = originDDD
    this.destinationDDD = destinationDDD
    return this.output
  }
}
