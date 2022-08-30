import { PhoneCall } from "../../../src/domain/entities"
import { InvalidDDDError } from "../../../src/domain/erros/invalid-ddd"
import { AddPhoneCallUseCase } from "../../../src/domain/useCases"
import { badRequest, ok } from "../../../src/presentation/helpers"
import { Controller, HttpResponse } from "../../../src/presentation/protocols"
import { makeFakePhoneCall } from "../../domain/mocks"

class AddPhoneCallServiceMock implements AddPhoneCallUseCase {
  input = null
  output = { ...makeFakePhoneCall(), id: 'some id' }
  async add(newCall: AddPhoneCallUseCase.Props): Promise<PhoneCall> {
    this.input = newCall
    return this.output
  }
}

class AddPhoneCallController implements Controller<AddPhoneCallUseCase.Props> {
  constructor(private readonly service: AddPhoneCallUseCase) { }

  async handle(req: AddPhoneCallUseCase.Props): Promise<HttpResponse> {
    try {
      const addedPhoneCall = await this.service.add(req)
      return ok(addedPhoneCall)
    } catch (error) {
      if (error instanceof InvalidDDDError) return badRequest(error)
    }
  }
}

type SutTypes = {
  sut: AddPhoneCallController,
  serviceMock: AddPhoneCallServiceMock
}

const makeSut = (): SutTypes => {
  const serviceMock = new AddPhoneCallServiceMock()
  const sut = new AddPhoneCallController(serviceMock)

  return {
    sut,
    serviceMock
  }
}

describe('add-phone-call-controller', () => {
  it('should return added phone call on success', async () => {
    const { serviceMock, sut } = makeSut()

    const httpResponse = await sut.handle(makeFakePhoneCall())

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(serviceMock.output)
  })

  it('should badRequest if service throws InvalidDDDError', async () => {
    const { serviceMock, sut } = makeSut()
    serviceMock.add = () => { throw new InvalidDDDError('invalid_ddd') }

    const httpResponse = await sut.handle(makeFakePhoneCall())

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidDDDError('invalid_ddd'))
  })
})
