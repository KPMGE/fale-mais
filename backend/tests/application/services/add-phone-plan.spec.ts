import { AddPhonePlanService } from "../../../src/application/services/add-plan"
import { PhonePlan } from "../../../src/domain/entities"
import { DuplicatePlanDurationError, InvalidPlanDurationError } from "../../../src/domain/erros"
import { makeFakePhonePlan } from "../../domain/mocks"
import { AddPhonePlanRepositoryMock, GetPhonePlanByDurationRepositoryMock } from "../mocks"

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
