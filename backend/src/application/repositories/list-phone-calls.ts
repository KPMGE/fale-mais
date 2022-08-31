import { PhoneCall } from "../../domain/entities";

export interface ListPhoneCallsRepository {
  list(): Promise<PhoneCall[]>
}
