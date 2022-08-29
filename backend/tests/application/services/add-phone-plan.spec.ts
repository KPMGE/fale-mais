import { AddPhonePlanRepository, GetPhonePlanByDurationRepository } from "../../../src/application/repositories"
import { AddPhonePlanService } from "../../../src/application/services/add-plan"
import { PhonePlan } from "../../../src/domain/entities"
import { DuplicatePlanDurationError, InvalidPlanDurationError } from "../../../src/domain/erros"

class AddPhonePlanRepositoryMock implements AddPhonePlanRepository {
  input = {}
  callsCount = 0
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    this.input = newPlan
    this.callsCount++
    return newPlan
  }
}

class GetPhonePlanByDurationRepositoryMock implements GetPhonePlanByDurationRepository {
  input = 0
  output = null
  async getByDuration(duration: number): Promise<PhonePlan> {
    this.input = duration
    return this.output
  }
}



type SutTypes = {
  addRepo: AddPhonePlanRepositoryMock
  getByDurationRepo: GetPhonePlanByDurationRepositoryMock
  sut: AddPhonePlanService
}

const makeSut = (): SutTypes => {
  const addRepo = new AddPhonePlanRepositoryMock()
  const getByDurationRepo = new GetPhonePlanByDurationRepositoryMock()
  const sut = new AddPhonePlanService(addRepo, getByDurationRepo)

  return {
    sut,
    addRepo,
    getByDurationRepo
  }
}

const makeFakePhonePlan = (): PhonePlan => ({
  id: 'any_phone_plan_id',
  tax: 0.1,
  durationInMinutes: 30
})

describe('add-phone-plan-service', () => {
  it('should call repository with right data', async () => {
    const { sut, addRepo } = makeSut()

    await sut.add(makeFakePhonePlan())

    expect(addRepo.input).toEqual(makeFakePhonePlan())
  })

  it('should call repository only once', async () => {
    const { sut, addRepo } = makeSut()

    await sut.add(makeFakePhonePlan())

    expect(addRepo.callsCount).toBe(1)
  })

  it('should throw error if there is a plan with the same duration already', async () => {
    const { sut, getByDurationRepo } = makeSut()

    // there is a plan with the same duration already
    getByDurationRepo.output = makeFakePhonePlan()

    const promise = sut.add(makeFakePhonePlan())

    await expect(promise).rejects.toThrowError(new DuplicatePlanDurationError())
  })

  it('should throw error if duration provided is less than or equal to 0', async () => {
    const { sut } = makeSut()

    const invalidDurationPlan: PhonePlan = { ...makeFakePhonePlan(), durationInMinutes: 0 }

    const promise = sut.add(invalidDurationPlan)

    await expect(promise).rejects.toThrowError(new InvalidPlanDurationError())
  })
})
