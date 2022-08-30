import { PhoneCall } from "../../../src/domain/entities"
import { InvalidDDDError } from "../../../src/domain/erros/invalid-ddd"
import { AddPhoneCallUseCase } from "../../../src/domain/useCases"
import { badRequest, ok, serverError } from "../../../src/presentation/helpers"
import { Controller, HttpResponse, Validator } from "../../../src/presentation/protocols"
import { makeFakePhoneCall } from "../../domain/mocks"
import { ValidatorMock } from "../mocks"

class AddPhoneCallServiceMock implements AddPhoneCallUseCase {
  input = null
  output = { ...makeFakePhoneCall(), id: 'some id' }
  async add(newCall: AddPhoneCallUseCase.Props): Promise<PhoneCall> {
    this.input = newCall
    return this.output
  }
}

class AddPhoneCallController implements Controller<AddPhoneCallUseCase.Props> {
  constructor(
    private readonly service: AddPhoneCallUseCase,
    private readonly validator: Validator
  ) { }

  async handle(req: AddPhoneCallUseCase.Props): Promise<HttpResponse> {
    const err = this.validator.validate(req)
    if (err) return badRequest(err)

    try {
      const addedPhoneCall = await this.service.add(req)
      return ok(addedPhoneCall)
    } catch (error) {
      if (error instanceof InvalidDDDError) return badRequest(error)
      return serverError(error)
    }
  }
}

type SutTypes = {
  sut: AddPhoneCallController,
  serviceMock: AddPhoneCallServiceMock,
  validatorMock: ValidatorMock
}

const makeSut = (): SutTypes => {
  const serviceMock = new AddPhoneCallServiceMock()
  const validatorMock = new ValidatorMock()
  const sut = new AddPhoneCallController(serviceMock, validatorMock)

  return {
    sut,
    serviceMock,
    validatorMock
  }
}

describe('add-phone-call-controller', () => {
  it('should return added phone call on success', async () => {
    const { serviceMock, sut } = makeSut()

    const httpResponse = await sut.handle(makeFakePhoneCall())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(serviceMock.output)
  })

  it('should return badRequest if service throws InvalidDDDError', async () => {
    const { serviceMock, sut } = makeSut()
    serviceMock.add = () => { throw new InvalidDDDError('invalid_ddd') }

    const httpResponse = await sut.handle(makeFakePhoneCall())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidDDDError('invalid_ddd'))
  })

  it('should return badRequest if validator returns error', async () => {
    const { validatorMock, sut } = makeSut()
    validatorMock.validate = () => { return new Error('validation error') }

    const httpResponse = await sut.handle(makeFakePhoneCall())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('validation error'))
  })

  it('should return serverError if service throws other Errors', async () => {
    const { serviceMock, sut } = makeSut()
    serviceMock.add = () => { throw new Error('service error') }

    const httpResponse = await sut.handle(makeFakePhoneCall())

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error('service error'))
  })
})
