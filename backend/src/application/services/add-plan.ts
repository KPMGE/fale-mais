import { PhonePlan } from "../../domain/entities"
import { DuplicatePlanDurationError, InvalidPlanDurationError } from "../../domain/erros"
import { AddPhonePlanUseCase } from "../../domain/useCases"
import { IdGenerator } from "../providers"
import { AddPhonePlanRepository, GetPhonePlanByDurationRepository } from "../repositories"

export class AddPhonePlanService implements AddPhonePlanUseCase {
  constructor(
    private readonly addPhonePlanRepo: AddPhonePlanRepository,
    private readonly getPlanByDurationRepo: GetPhonePlanByDurationRepository,
    private readonly idGenerator: IdGenerator,
  ) { }

  async add(newPlan: AddPhonePlanUseCase.Props): Promise<PhonePlan> {
    if (newPlan.durationInMinutes <= 0) throw new InvalidPlanDurationError()

    const newPlanWithId: PhonePlan = {
      ...newPlan,
      id: this.idGenerator.generate()
    }

    const plan = await this.getPlanByDurationRepo.getByDuration(newPlan.durationInMinutes)
    if (plan) throw new DuplicatePlanDurationError()

    const addedPlan = await this.addPhonePlanRepo.add(newPlanWithId)
    return addedPlan
  }
}

