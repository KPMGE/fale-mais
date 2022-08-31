import { ListPhoneCallsRepository } from "../../../application/repositories";
import { AddPhoneCallRepository } from "../../../application/repositories/add-phone-call";
import { PhoneCall } from "../../../domain/entities";

let phoneCalls: PhoneCall[] = []

export class InMemoryPhoneCallRepository implements AddPhoneCallRepository, ListPhoneCallsRepository {
  async add(newCall: PhoneCall): Promise<PhoneCall> {
    phoneCalls.push(newCall)
    return newCall
  }

  async list(): Promise<PhoneCall[]> {
    return phoneCalls
  }
}
