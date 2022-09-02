import { GetPhoneCallByDDDRepository, ListPhoneCallsRepository } from "../../../application/repositories";
import { AddPhoneCallRepository } from "../../../application/repositories/add-phone-call";
import { PhoneCall } from "../../../domain/entities";

let phoneCalls: PhoneCall[] = []

export class InMemoryPhoneCallRepository implements AddPhoneCallRepository, ListPhoneCallsRepository, GetPhoneCallByDDDRepository {
  async add(newCall: PhoneCall): Promise<PhoneCall> {
    phoneCalls.push(newCall)
    return newCall
  }

  async list(): Promise<PhoneCall[]> {
    return phoneCalls
  }

  async getByDDD(originDDD: string, destinationDDD: string): Promise<PhoneCall> {
    return phoneCalls.find(phoneCall => {
      if (phoneCall.originDDD.localeCompare(originDDD) && phoneCall.destinationDDD.localeCompare(destinationDDD)) return true
      return false
    })
  }
}
