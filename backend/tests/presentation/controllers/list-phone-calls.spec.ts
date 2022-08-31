import { ListPhoneCallsController } from "../../../src/presentation/controllers"
import { ListPhoneCallsServiceStub } from "../mocks"

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
