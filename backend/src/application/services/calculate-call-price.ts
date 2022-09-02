import { PhoneCallNotFoundError, PhonePlanNotFoundError } from "../../domain/erros"
import { CalculateCallPriceUseCase } from "../../domain/useCases"
import { GetPhoneCallByDDDRepository, GetPhonePlanByIdRepository } from "../repositories"

export class CalculateCallPriceService implements CalculateCallPriceUseCase {
  constructor(
    private readonly getPhonePlanRepo: GetPhonePlanByIdRepository,
    private readonly getPhoneCallRepo: GetPhoneCallByDDDRepository
  ) { }

  async calculate(input: CalculateCallPriceUseCase.Props): Promise<CalculateCallPriceUseCase.Result> {
    const { phonePlanId, originDDD, destinationDDD, amountMinutes } = input

    const foundPhonePlan = await this.getPhonePlanRepo.getById(phonePlanId)
    const foundPhoneCall = await this.getPhoneCallRepo.getByDDD(originDDD, destinationDDD)

    if (!foundPhonePlan) throw new PhonePlanNotFoundError()
    if (!foundPhoneCall) throw new PhoneCallNotFoundError()

    const { durationInMinutes, tax } = foundPhonePlan
    const { pricePerMinute } = foundPhoneCall

    const priceWithoutPlan = pricePerMinute * amountMinutes
    let priceWithPlan = 0

    if (durationInMinutes < amountMinutes) {
      const difference = amountMinutes - durationInMinutes
      const priceWithoutTax = difference * pricePerMinute
      const extraTax = priceWithoutTax * tax
      priceWithPlan = priceWithoutTax + extraTax
    }

    return {
      priceWithoutPlan,
      priceWithPlan
    }
  }
}
