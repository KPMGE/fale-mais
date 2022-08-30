import { ListPhonePlansController } from "../../../src/main/factories/controllers"
import { ListPhonePlansServiceMock } from "../mocks"

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
