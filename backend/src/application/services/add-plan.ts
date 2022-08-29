import { PhonePlan } from "../../domain/entities"
import { DuplicatePlanDurationError, InvalidPlanDurationError } from "../../domain/erros"
import { AddPhonePlanUseCase } from "../../domain/useCases"
import { AddPhonePlanRepository, GetPhonePlanByDurationRepository } from "../repositories"

export class AddPhonePlanService implements AddPhonePlanUseCase {
  constructor(
    private readonly addPhonePlanRepo: AddPhonePlanRepository,
    private readonly getPlanByDurationRepo: GetPhonePlanByDurationRepository,
  ) { }

  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    if (newPlan.durationInMinutes <= 0) throw new InvalidPlanDurationError()

    const plan = await this.getPlanByDurationRepo.getByDuration(newPlan.durationInMinutes)
    if (plan) throw new DuplicatePlanDurationError()

    const addedPlan = await this.addPhonePlanRepo.add(newPlan)
    return addedPlan
  }
}
