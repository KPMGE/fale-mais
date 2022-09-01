import { PhonePlan } from "../../../src/domain/entities"
import { PhonePlanNotFoundError } from "../../../src/domain/erros"
import { GetPhonePlanByIdUseCase } from "../../../src/domain/useCases"
import { badRequest, ok, serverError } from "../../../src/presentation/helpers"
import { Controller, HttpResponse } from "../../../src/presentation/protocols"
import { makeFakePhonePlan } from "../../domain/mocks"

class GetPhonePlanByIdController implements Controller {
  constructor(private readonly service: GetPhonePlanByIdUseCase) { }

  async handle(req: any): Promise<HttpResponse> {
    try {
      const foundPlan = await this.service.getById(req.planId)
      return ok(foundPlan)
    } catch (error) {
      if (error instanceof PhonePlanNotFoundError) return badRequest(error)
      return serverError(error)
    }
  }
}

class GetPhonePlanByIdServiceStub implements GetPhonePlanByIdUseCase {
  output = makeFakePhonePlan()
  async getById(planId: string): Promise<PhonePlan> {
    return this.output
  }
}

type SutTypes = {
  sut: GetPhonePlanByIdController,
  serviceStub: GetPhonePlanByIdServiceStub
}

const makeSut = (): SutTypes => {
  const serviceStub = new GetPhonePlanByIdServiceStub()
  const sut = new GetPhonePlanByIdController(serviceStub)
  return {
    serviceStub,
    sut
  }
}

describe('get-phone-plan-by-id-controller', () => {
  it('should return ok on success', async () => {
    const { serviceStub, sut } = makeSut()

    const httpResponse = await sut.handle({ planId: 'any_plan_id' })

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(serviceStub.output)
  })

  it('should return badRequest if service throws PhonePlanNotFoundError', async () => {
    const { serviceStub, sut } = makeSut()
    serviceStub.getById = () => { throw new PhonePlanNotFoundError() }

    const httpResponse = await sut.handle({ planId: 'any_plan_id' })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new PhonePlanNotFoundError())
  })

  it('should return serverError if service throws other errors', async () => {
    const { serviceStub, sut } = makeSut()
    serviceStub.getById = () => { throw new Error('repo error') }

    const httpResponse = await sut.handle({ planId: 'any_plan_id' })

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error('repo error'))
  })
})
