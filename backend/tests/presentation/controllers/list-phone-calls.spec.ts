import { PhoneCall } from "../../../src/domain/entities"
import { ListPhoneCallsUseCase } from "../../../src/domain/useCases"
import { ok, serverError } from "../../../src/presentation/helpers"
import { Controller, HttpResponse } from "../../../src/presentation/protocols"
import { makeFakePhoneCall } from "../../domain/mocks"

class ListPhoneCallsController implements Controller {
  constructor(private readonly service: ListPhoneCallsUseCase) { }
  async handle(req: any): Promise<HttpResponse> {
    try {
      const phoneCalls = await this.service.list()
      return ok(phoneCalls)
    } catch (error) {
      return serverError(error)
    }
  }
}

class ListPhoneCallsServiceStub implements ListPhoneCallsUseCase {
  private fakePhoneCall = {
    ...makeFakePhoneCall(),
    id: 'any id'
  }
  output = [this.fakePhoneCall, this.fakePhoneCall, this.fakePhoneCall]
  async list(): Promise<PhoneCall[]> {
    return this.output
  }
}

type SutTypes = {
  serviceStub: ListPhoneCallsServiceStub
  sut: ListPhoneCallsController
}

const makeSut = (): SutTypes => {
  const serviceStub = new ListPhoneCallsServiceStub()
  const sut = new ListPhoneCallsController(serviceStub)
  return { serviceStub, sut }
}

describe('list-phone-calls-controller', () => {
  it('should return return right data on success', async () => {
    const { sut, serviceStub } = makeSut()

    const httpResponse = await sut.handle(null)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(serviceStub.output)
  })

  it('should return serverError if service throws', async () => {
    const { sut, serviceStub } = makeSut()
    serviceStub.list = () => { throw new Error('service error') }

    const httpResponse = await sut.handle(null)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error('service error'))
  })
})
