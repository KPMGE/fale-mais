import { DuplicatePlanDurationError, InvalidPlanDurationError } from '../../../src/domain/erros'
import { AddPhonePlanController } from '../../../src/presentation/controllers/add-phone-plan'
import { makeFakePhonePlan } from '../../domain/mocks'
import { AddPhonePlanServiceMock, ValidatorMock } from '../mocks'

type SutTypes = {
  sut: AddPhonePlanController,
  serviceMock: AddPhonePlanServiceMock
  validatorMock: ValidatorMock
}

const makeSut = (): SutTypes => {
  const serviceMock = new AddPhonePlanServiceMock()
  const validatorMock = new ValidatorMock()
  const sut = new AddPhonePlanController(serviceMock, validatorMock)

  return {
    sut,
    serviceMock,
    validatorMock
  }
}

describe('add-phone-plan-controller', () => {
  it('should call service with right data', async () => {
    const { sut, serviceMock } = makeSut()

    await sut.handle(makeFakePhonePlan())

    expect(serviceMock.input).toEqual(makeFakePhonePlan())
  })

  it('should return the added phone plan on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakePhonePlan())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(makeFakePhonePlan())
  })

  it('should badRequest if service returns InvalidPhoneNumberError or DuplicatePlanDuration', async () => {
    const { sut, serviceMock } = makeSut()

    serviceMock.add = () => { throw new InvalidPlanDurationError() }
    let httpResponse = await sut.handle(makeFakePhonePlan())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidPlanDurationError())

    serviceMock.add = () => { throw new DuplicatePlanDurationError() }
    httpResponse = await sut.handle(makeFakePhonePlan())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new DuplicatePlanDurationError())
  })

  it('should return badRequest validator returns error', async () => {
    const { sut, validatorMock } = makeSut()
    validatorMock.validate = () => { return new Error('validator error') }

    const httpResponse = await sut.handle(makeFakePhonePlan())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('validator error'))
  })

  it('should return serverError if service throws any other error', async () => {
    const { sut, serviceMock } = makeSut()
    serviceMock.add = () => { throw new Error('service error') }

    const httpResponse = await sut.handle(makeFakePhonePlan())

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error('service error'))
  })
})
