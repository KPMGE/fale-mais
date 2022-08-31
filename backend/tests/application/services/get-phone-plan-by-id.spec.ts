import { PhonePlan } from "../../../src/domain/entities"
import { makeFakePhonePlan } from "../../domain/mocks"

interface GetPhonePlanByIdUseCase {
  getById(planId: string): Promise<PhonePlan>
}

interface GetPhonePlanByIdRepository {
  getById(planId: string): Promise<PhonePlan>
}

class PhonePlanNotFoundError extends Error {
  constructor() {
    super('phone not found!')
    this.name = 'PhonePlanNotFoundError'
  }
}

class GetPhonePlanByIdService implements GetPhonePlanByIdUseCase {
  constructor(private readonly getByIdRepo: GetPhonePlanByIdRepository) { }

  async getById(planId: string): Promise<PhonePlan> {
    const foundPhonePlan = await this.getByIdRepo.getById(planId)
    if (!foundPhonePlan) throw new PhonePlanNotFoundError()
    return foundPhonePlan
  }
}

class GetPhonePlanByIdRepositoryMock implements GetPhonePlanByIdRepository {
  input = ""
  output = makeFakePhonePlan()
  async getById(planId: string): Promise<PhonePlan> {
    this.input = planId
    return this.output
  }
}

type SutTypes = {
  sut: GetPhonePlanByIdService
  getRepo: GetPhonePlanByIdRepositoryMock
}

const makeSut = (): SutTypes => {
  const getRepo = new GetPhonePlanByIdRepositoryMock()
  const sut = new GetPhonePlanByIdService(getRepo)
  return {
    getRepo,
    sut
  }
}

describe('get-phone-call-by-id-servie', () => {
  it('should call repository with right data', async () => {
    const { getRepo, sut } = makeSut()

    await sut.getById('any_phone_plan_id')

    expect(getRepo.input).toBe('any_phone_plan_id')
  })

  it('should throw if repository throws', async () => {
    const { getRepo, sut } = makeSut()
    getRepo.getById = () => { throw new Error('repo error') }

    const promise = sut.getById('any_phone_plan_id')

    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })

  it('should throw PhonePlanNotFoundError if repository retuns null', async () => {
    const { getRepo, sut } = makeSut()
    getRepo.output = null

    const promise = sut.getById('any_phone_plan_id')

    await expect(promise).rejects.toThrowError(new PhonePlanNotFoundError())
  })
})
