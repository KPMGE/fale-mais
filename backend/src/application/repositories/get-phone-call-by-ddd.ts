import { PhoneCall } from "../../domain/entities";

export interface GetPhoneCallByDDDRepository {
  getByDDD(originDDD: string, destinationDDD: string): Promise<PhoneCall>
}
