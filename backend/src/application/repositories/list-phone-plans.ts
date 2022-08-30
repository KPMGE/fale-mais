import { PhonePlan } from "../../domain/entities";

export interface ListPhonePlansRepository {
  list(): Promise<PhonePlan[]>
}
