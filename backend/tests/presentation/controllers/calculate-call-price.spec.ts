import { CalculateCallPriceController } from "../../../src/presentation/controllers"
import { makefakeCalculatePriceInput } from "../../application/mocks"
import { CalculateCallPriceServiceMock, ValidatorMock } from "../mocks"

type SutTypes = {
  serviceMock: CalculateCallPriceServiceMock
  sut: CalculateCallPriceController
  validatorMock: ValidatorMock
}

const makeSut = (): SutTypes => {
  const serviceMock = new CalculateCallPriceServiceMock()
  const validatorMock = new ValidatorMock()
  const sut = new CalculateCallPriceController(serviceMock, validatorMock)
  return { sut, serviceMock, validatorMock }
}

describe('calculate-call-price-controller', () => {
  it('should return data from service on success', async () => {
    const { sut, serviceMock } = makeSut()

    const httpResponse = await sut.handle(makefakeCalculatePriceInput())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(serviceMock.output)
  })

  it('should return badRequest if validator returns error', async () => {
    const { sut, validatorMock } = makeSut()
    validatorMock.validate = () => { return new Error('validation error') }

    const httpResponse = await sut.handle(makefakeCalculatePriceInput())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('validation error'))
  })

  it('should return serverError service throws', async () => {
    const { sut, serviceMock } = makeSut()
    serviceMock.calculate = () => { throw new Error('service error') }

    const httpResponse = await sut.handle(makefakeCalculatePriceInput())

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error('service error'))
  })
})
