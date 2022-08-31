import { AddPhoneCallRepository } from "../../../application/repositories/add-phone-call";
import { PhoneCall } from "../../../domain/entities";

let phoneCalls: PhoneCall[] = []

export class InMemoryPhoneCallRepository implements AddPhoneCallRepository {
  async add(newCall: PhoneCall): Promise<PhoneCall> {
    phoneCalls.push(newCall)
    return newCall
  }
}
