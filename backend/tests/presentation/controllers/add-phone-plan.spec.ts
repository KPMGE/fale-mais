import { PhonePlan } from '../../../src/domain/entities'
import { DuplicatePlanDurationError, InvalidPlanDurationError } from '../../../src/domain/erros'
import { AddPhonePlanUseCase } from '../../../src/domain/useCases'
import { badRequest, ok, serverError } from '../../../src/presentation/helpers'
import { Controller } from '../../../src/presentation/protocols/controller'
import { HttpResponse } from '../../../src/presentation/protocols/http'
import { Validator } from '../../../src/presentation/protocols/validator'
import { makeFakePhonePlan } from '../../domain/mocks'

class AddPhonePlanServiceMock implements AddPhonePlanUseCase {
  input = null
  output = makeFakePhonePlan()
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    this.input = newPlan
    return this.output
  }
}

class AddPhonePlanController implements Controller<PhonePlan> {
  constructor(
    private readonly service: AddPhonePlanUseCase,
    private readonly validator: Validator
  ) { }

  async handle(req: PhonePlan): Promise<HttpResponse> {
    const error = this.validator.validate(req)
    if (error) return badRequest(error)

    try {
      const addedPhonePlan = await this.service.add(req)
      return ok(addedPhonePlan)
    } catch (error) {
      if (error instanceof InvalidPlanDurationError || error instanceof DuplicatePlanDurationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}

class ValidatorMock implements Validator {
  output = null
  validate(data: any): Error {
    return this.output
  }
}

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

class MissingParamError extends Error {
  constructor(fieldName: string) {
    super(`Missing field ${fieldName}!`)
    this.name = 'MissingParamError '
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
