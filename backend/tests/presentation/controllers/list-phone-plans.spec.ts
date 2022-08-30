import { PhonePlan } from "../../../src/domain/entities"
import { ListPhonePlansUseCase } from "../../../src/domain/useCases"
import { ok, serverError } from "../../../src/presentation/helpers"
import { Controller, HttpResponse } from "../../../src/presentation/protocols"
import { makeFakePhonePlan } from "../../domain/mocks"

class ListPhonePlansController implements Controller {
  constructor(private readonly service: ListPhonePlansUseCase) { }
  async handle(): Promise<HttpResponse> {
    try {
      const plans = await this.service.list()
      return ok(plans)
    } catch (error) {
      return serverError(error)
    }
  }
}

class ListPhonePlansServiceMock implements ListPhonePlansUseCase {
  output = [makeFakePhonePlan(), makeFakePhonePlan()]
  async list(): Promise<PhonePlan[]> {
    return this.output
  }
}

describe('list-phone-plans-controller', () => {
  it('should return status ok with right data on success', async () => {
    const serviceMock = new ListPhonePlansServiceMock()
    const sut = new ListPhonePlansController(serviceMock)

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe(serviceMock.output)
  })

  it('should return server error if service throws', async () => {
    const serviceMock = new ListPhonePlansServiceMock()
    const sut = new ListPhonePlansController(serviceMock)
    serviceMock.list = () => { throw new Error('service error') }

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error('service error'))
  })
})
