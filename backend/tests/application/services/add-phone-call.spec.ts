import { AddPhoneCallService } from "../../../src/application/services"
import { InvalidDDDError } from "../../../src/domain/erros/invalid-ddd"
import { makeFakePhoneCall } from "../../domain/mocks"
import { IdGeneratorMock } from "../mocks"
import { AddPhoneCallRepositorySpy } from "../mocks/add-phone-call"

type SutTypes = {
  sut: AddPhoneCallService,
  idGeneratorMock: IdGeneratorMock,
  addRepoSpy: AddPhoneCallRepositorySpy
}

const makeSut = (): SutTypes => {
  const addRepoSpy = new AddPhoneCallRepositorySpy()
  const idGeneratorMock = new IdGeneratorMock()
  const sut = new AddPhoneCallService(addRepoSpy, idGeneratorMock)
  return {
    sut,
    idGeneratorMock,
    addRepoSpy
  }
}

describe('add-phone-call-service', () => {
  it('should create an id for the phone call before sending it to the repository', async () => {
    const { addRepoSpy, idGeneratorMock, sut } = makeSut()

    await sut.add(makeFakePhoneCall())

    expect(addRepoSpy.input).toEqual({ ...makeFakePhoneCall(), id: idGeneratorMock.output })
  })

  it('should return the added phone call', async () => {
    const { addRepoSpy, sut } = makeSut()

    const addedCall = await sut.add(makeFakePhoneCall())

    expect(addedCall).toEqual(addRepoSpy.output)
  })

  it('should throw if repository throws', async () => {
    const { addRepoSpy, sut } = makeSut()
    addRepoSpy.add = () => { throw new Error('repo error') }

    const promise = sut.add(makeFakePhoneCall())

    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })

  it('should throw if originDDD or destinationDDD length is different than 3', async () => {
    const { sut } = makeSut()

    const invalidOrigin = { ...makeFakePhoneCall(), originDDD: 'invalid_origin' }
    let promise = sut.add(invalidOrigin)
    await expect(promise).rejects.toThrowError(new InvalidDDDError('invalid_origin'))

    const invalidDestination = { ...makeFakePhoneCall(), destinationDDD: 'invalid_destination' }
    promise = sut.add(invalidDestination)
    await expect(promise).rejects.toThrowError(new InvalidDDDError('invalid_destination'))
  })

  it('should throw if originDDD or destinationDDD are not numbers', async () => {
    const { sut } = makeSut()

    const invalidOrigin = { ...makeFakePhoneCall(), originDDD: '0a0' }
    let promise = sut.add(invalidOrigin)
    await expect(promise).rejects.toThrowError(new InvalidDDDError('0a0'))
  })
})
