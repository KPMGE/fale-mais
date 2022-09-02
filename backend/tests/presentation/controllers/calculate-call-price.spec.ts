import { CalculateCallPriceUseCase } from "../../../src/domain/useCases"
import { badRequest, ok, serverError } from "../../../src/presentation/helpers"
import { Controller, HttpResponse, Validator } from "../../../src/presentation/protocols"
import { makefakeCalculatePriceInput } from "../../application/mocks"
import { ValidatorMock } from "../mocks"

class CalculateCallPriceServiceMock implements CalculateCallPriceUseCase {
  output = { priceWithPlan: 4.2, priceWithoutPlan: 20 }
  async calculate(input: CalculateCallPriceUseCase.Props): Promise<CalculateCallPriceUseCase.Result> {
    return this.output
  }
}

class CalculateCallPriceController implements Controller<CalculateCallPriceUseCase.Props> {
  constructor(
    private readonly service: CalculateCallPriceUseCase,
    private readonly validator: Validator
  ) { }

  async handle(req: CalculateCallPriceUseCase.Props): Promise<HttpResponse> {
    const err = this.validator.validate(req)
    if (err) return badRequest(err)

    try {
      const result = await this.service.calculate(req)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

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
