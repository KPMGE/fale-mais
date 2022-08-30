import { PhoneCall } from "../../domain/entities";

export interface AddPhoneCallRepository {
  add(newCall: PhoneCall): Promise<PhoneCall>
}
