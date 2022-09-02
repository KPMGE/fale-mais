import { CalculateCallPriceService } from "../../../src/application/services"
import { PhoneCallNotFoundError, PhonePlanNotFoundError } from "../../../src/domain/erros"
import {
  GetPhoneCallByDDDRepositoryMock,
  GetPhonePlanByIdRepositoryMock,
  makefakeCalculatePriceInput
} from "../mocks"

type SutTypes = {
  sut: CalculateCallPriceService
  getCallRepo: GetPhoneCallByDDDRepositoryMock
  getPlanRepo: GetPhonePlanByIdRepositoryMock
}

const makeSut = (): SutTypes => {
  const getCallRepo = new GetPhoneCallByDDDRepositoryMock()
  const getPlanRepo = new GetPhonePlanByIdRepositoryMock()
  const sut = new CalculateCallPriceService(getPlanRepo, getCallRepo)
  return { getPlanRepo, getCallRepo, sut }
}

describe('calculate-call-price-service', () => {
  it('should call repository with right data', async () => {
    const { getCallRepo, sut, getPlanRepo } = makeSut()

    await sut.calculate(makefakeCalculatePriceInput())

    expect(getCallRepo.originDDD).toBe('any_origin_ddd')
    expect(getCallRepo.destinationDDD).toBe('any_destination_ddd')
    expect(getPlanRepo.input).toBe('any_phone_plan_id')
  })

  it('should throw if getCallRepo returns null', async () => {
    const { getCallRepo, sut } = makeSut()

    // call repo returns null
    getCallRepo.output = null

    const promise = sut.calculate(makefakeCalculatePriceInput())
    await expect(promise).rejects.toThrowError(new PhoneCallNotFoundError())
  })

  it('should throw if getPlanRepo returns null', async () => {
    const { getPlanRepo, sut } = makeSut()

    // plan repo returns null
    getPlanRepo.output = null

    const promise = sut.calculate(makefakeCalculatePriceInput())

    await expect(promise).rejects.toThrowError(new PhonePlanNotFoundError())
  })

  it('should calculate the price with and wihtout plan', async () => {
    const { getCallRepo, sut, getPlanRepo } = makeSut()

    // plan duration of 60 minutes
    getPlanRepo.output.durationInMinutes = 60

    // call duration of 20 minutes
    const fakeInputCase1 = { ...makefakeCalculatePriceInput(), durationInMinutes: 20 }

    // withoutPlan, the price is the amountMinutes times the price per minute
    const withoutPlanCase1 = getCallRepo.output.pricePerMinute * fakeInputCase1.amountMinutes
    // as the plan has a duration greater than the amountMinutes, the price with the plan is 0
    const withPlanCase1 = 0

    const resultCase1 = await sut.calculate(fakeInputCase1)

    expect(resultCase1.priceWithPlan).toBe(withPlanCase1)
    expect(resultCase1.priceWithoutPlan).toBe(withoutPlanCase1)

    //  plan duration of 20 minutes 
    getPlanRepo.output.durationInMinutes = 20
    // call duration of 60 minutes
    const fakeInputCase2 = { ...makefakeCalculatePriceInput(), durationInMinutes: 60 }

    // the price without the plan is the same, the amountMinutes times the price per minute
    const withoutPlanCase2 = getCallRepo.output.pricePerMinute * fakeInputCase2.amountMinutes

    // the price with the plan is the amountMinutes minus the durationInMinutes of the plan, times the price per minute
    // that gives the price with the plan, but without the tax.
    // the final price will be that price plus that one times the tax
    const difference = 60 - 20
    const priceWithPlanAndWithoutTax = difference * getCallRepo.output.pricePerMinute
    const withPlanCase2 = priceWithPlanAndWithoutTax + priceWithPlanAndWithoutTax * getPlanRepo.output.tax

    const resultCase2 = await sut.calculate(fakeInputCase2)

    expect(resultCase2.priceWithPlan).toBe(withPlanCase2)
    expect(resultCase2.priceWithoutPlan).toBe(withoutPlanCase2)
  })
})
