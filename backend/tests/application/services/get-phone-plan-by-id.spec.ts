import { GetPhonePlanByIdService } from "../../../src/application/services"
import { PhonePlanNotFoundError } from "../../../src/domain/erros"
import { GetPhonePlanByIdRepositoryMock } from "../mocks"

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
