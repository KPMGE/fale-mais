import { PhonePlan } from '../../../src/domain/entities'
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
      return badRequest(error)
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
})
