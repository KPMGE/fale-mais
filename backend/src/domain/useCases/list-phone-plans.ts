import { PhonePlan } from "../entities";

export interface ListPhonePlansUseCase {
  list(): Promise<PhonePlan[]>
}
