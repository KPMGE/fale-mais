import { CalculateCallPriceService } from "../../../src/application/services"
import {
  GetPhoneCallByDDDRepositoryMock,
  GetPhonePlanByIdRepositoryMock,
  makefakeCalculatePriceInput
} from "../mocks"

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

  it('should calculate the price with and wihtout plan', async () => {
    const getCallRepo = new GetPhoneCallByDDDRepositoryMock()
    const getPlanRepo = new GetPhonePlanByIdRepositoryMock()
    const sut = new CalculateCallPriceService(getPlanRepo, getCallRepo)

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
    const withPlanCase2 = (60 - 20) * getCallRepo.output.pricePerMinute

    const resultCase2 = await sut.calculate(fakeInputCase2)

    expect(resultCase2.priceWithPlan).toBe(withPlanCase2)
    expect(resultCase2.priceWithoutPlan).toBe(withoutPlanCase2)
  })
})
