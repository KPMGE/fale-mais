import { CalculateCallPriceUseCase } from "../../domain/useCases"
import { GetPhoneCallByDDDRepository, GetPhonePlanByIdRepository } from "../repositories"

export class CalculateCallPriceService implements CalculateCallPriceUseCase {
  constructor(
    private readonly getPhonePlanRepo: GetPhonePlanByIdRepository,
    private readonly getPhoneCallRepo: GetPhoneCallByDDDRepository
  ) { }

  async calculate(input: CalculateCallPriceUseCase.Props): Promise<CalculateCallPriceUseCase.Result> {
    const { phonePlanId, originDDD, destinationDDD, amountMinutes } = input

    const { durationInMinutes } = await this.getPhonePlanRepo.getById(phonePlanId)
    const { pricePerMinute } = await this.getPhoneCallRepo.getByDDD(originDDD, destinationDDD)

    const priceWithoutPlan = pricePerMinute * amountMinutes
    let priceWithPlan = 0

    if (durationInMinutes < amountMinutes) {
      const difference = amountMinutes - durationInMinutes
      priceWithPlan = difference * pricePerMinute
    }

    return {
      priceWithoutPlan,
      priceWithPlan
    }
  }
}
