import { PhonePlan } from "../../domain/entities"
import { PhonePlanNotFoundError } from "../../domain/erros"
import { GetPhonePlanByIdUseCase } from "../../domain/useCases"
import { GetPhonePlanByIdRepository } from "../repositories"

export class GetPhonePlanByIdService implements GetPhonePlanByIdUseCase {
  constructor(private readonly getByIdRepo: GetPhonePlanByIdRepository) { }

  async getById(planId: string): Promise<PhonePlan> {
    const foundPhonePlan = await this.getByIdRepo.getById(planId)
    if (!foundPhonePlan) throw new PhonePlanNotFoundError()
    return foundPhonePlan
  }
}
