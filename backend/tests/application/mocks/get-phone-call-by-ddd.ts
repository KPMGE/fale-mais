import { GetPhoneCallByDDDRepository } from "../../../src/application/repositories"
import { PhoneCall } from "../../../src/domain/entities"

export class GetPhoneCallByDDDRepositoryMock implements GetPhoneCallByDDDRepository {
  output = null
  originDDD = ""
  destinationDDD = ""
  async getByDDD(originDDD: string, destinationDDD: string): Promise<PhoneCall> {
    this.originDDD = originDDD
    this.destinationDDD = destinationDDD
    return this.output
  }
}
