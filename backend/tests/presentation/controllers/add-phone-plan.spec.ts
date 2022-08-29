import { PhonePlan } from '../../../src/domain/entities'
import { DuplicatePlanDurationError, InvalidPlanDurationError } from '../../../src/domain/erros'
import { AddPhonePlanUseCase } from '../../../src/domain/useCases'
import { makeFakePhonePlan } from '../../domain/mocks'

type HttpResponse = {
  statusCode: number
  body: any
}

interface Controller<T = any> {
  handle(req: T): Promise<HttpResponse>
}

const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200
})

const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400,
})

const serverError = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 500,
})

class AddPhonePlanServiceMock implements AddPhonePlanUseCase {
  input = null
  output = makeFakePhonePlan()
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    this.input = newPlan
    return this.output
  }
}

class AddPhonePlanController implements Controller<PhonePlan> {
  constructor(private readonly service: AddPhonePlanUseCase) { }
  async handle(req: PhonePlan): Promise<HttpResponse> {
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

type SutTypes = {
  sut: AddPhonePlanController,
  serviceMock: AddPhonePlanServiceMock
}

const makeSut = (): SutTypes => {
  const serviceMock = new AddPhonePlanServiceMock()
  const sut = new AddPhonePlanController(serviceMock)

  return {
    sut, serviceMock
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
})
