import { PhoneCall } from "../entities";

export interface ListPhoneCallsUseCase {
  list(): Promise<PhoneCall[]>
}
