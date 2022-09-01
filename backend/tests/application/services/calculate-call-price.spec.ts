import { GetPhoneCallByDDDRepository, GetPhonePlanByIdRepository } from "../../../src/application/repositories"
import { GetPhoneCallByDDDRepositoryMock, GetPhonePlanByIdRepositoryMock } from "../mocks"

interface CalculateCallPriceUseCase {
  calculate(input: CalculateCallPriceUseCase.Props): Promise<number>
}

export namespace CalculateCallPriceUseCase {
  export type Props = {
    phonePlanId: string,
    originDDD: string,
    destinationDDD: string
  }
}

class CalculateCallPriceService implements CalculateCallPriceUseCase {
  constructor(
    private readonly getPhonePlanRepo: GetPhonePlanByIdRepository,
    private readonly getPhoneCallRepo: GetPhoneCallByDDDRepository
  ) { }

  async calculate({ phonePlanId, originDDD, destinationDDD }: CalculateCallPriceUseCase.Props): Promise<number> {
    await this.getPhonePlanRepo.getById(phonePlanId)
    await this.getPhoneCallRepo.getByDDD(originDDD, destinationDDD)
    return null
  }
}

const makefakeCalculatePriceInput = (): CalculateCallPriceUseCase.Props => ({
  phonePlanId: 'any_phone_plan_id',
  originDDD: 'any_origin_ddd',
  destinationDDD: 'any_destination_ddd'
})

describe('calculate-call-price-service', () => {
  it('should call repository with right data', async () => {
    const getCallRepo = new GetPhoneCallByDDDRepositoryMock()
    const getPlanRepo = new GetPhonePlanByIdRepositoryMock()
    const sut = new CalculateCallPriceService(getPlanRepo, getCallRepo)

    await sut.calculate(makefakeCalculatePriceInput())

    expect(getCallRepo.originDDD).toBe('any_origin_ddd')
    expect(getCallRepo.destinationDDD).toBe('any_destination_ddd')
    expect(getPlanRepo.input).toBe('any_phone_plan_id')
  })
})
