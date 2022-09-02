import { AddPhoneCallService } from "../../../src/application/services"
import { DuplicatePhoneCallError } from "../../../src/domain/erros"
import { InvalidDDDError } from "../../../src/domain/erros/invalid-ddd"
import { makeFakePhoneCall } from "../../domain/mocks"
import { GetPhoneCallByDDDRepositoryMock, IdGeneratorMock } from "../mocks"
import { AddPhoneCallRepositorySpy } from "../mocks/add-phone-call"

type SutTypes = {
  sut: AddPhoneCallService,
  idGeneratorMock: IdGeneratorMock,
  addRepoSpy: AddPhoneCallRepositorySpy
  getByDDDRepo: GetPhoneCallByDDDRepositoryMock
}

const makeSut = (): SutTypes => {
  const addRepoSpy = new AddPhoneCallRepositorySpy()
  const idGeneratorMock = new IdGeneratorMock()
  const getByDDDRepo = new GetPhoneCallByDDDRepositoryMock()
  getByDDDRepo.output = null
  const sut = new AddPhoneCallService(addRepoSpy, idGeneratorMock, getByDDDRepo)
  return {
    sut,
    idGeneratorMock,
    addRepoSpy,
    getByDDDRepo
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

  it('should throw if there is a call with the same originDDD and destinationDDD already', async () => {
    const { sut, getByDDDRepo } = makeSut()
    getByDDDRepo.getByDDD = () => Promise.resolve({ ...makeFakePhoneCall(), id: 'any_id' })

    let promise = sut.add(makeFakePhoneCall())
    await expect(promise).rejects.toThrowError(new DuplicatePhoneCallError())
  })
})
