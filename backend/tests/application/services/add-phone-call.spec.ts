type PhoneCall = {
  id: string
  origin: string
  destination: string
  pricePerMinue: number
}

export namespace AddPhoneCallUseCase {
  export type Props = Omit<PhoneCall, 'id'>
}

interface AddPhoneCallUseCase {
  add(newCall: AddPhoneCallUseCase.Props): Promise<PhoneCall>
}

interface AddPhoneCallRepository {
  add(newCall: PhoneCall): Promise<PhoneCall>
}

class AddPhoneCallRepositorySpy implements AddPhoneCallRepository {
  input = null
  async add(newCall: PhoneCall): Promise<PhoneCall> {
    this.input = newCall
    return null
  }
}

class AddPhoneCallService implements AddPhoneCallUseCase {
  constructor(private readonly repo: AddPhoneCallRepository) { }

  async add(newCall: AddPhoneCallUseCase.Props): Promise<PhoneCall> {
    await this.repo.add({ ...newCall, id: '' })
    return null
  }
}

const makeFakePhoneCall = (): AddPhoneCallUseCase.Props => ({
  destination: '000',
  origin: '000',
  pricePerMinue: 2.2,
})

describe('add-phone-call-service', () => {
  it('should call repository with right data', async () => {
    const addRepoSpy = new AddPhoneCallRepositorySpy()
    const sut = new AddPhoneCallService(addRepoSpy)

    await sut.add(makeFakePhoneCall())

    expect(addRepoSpy.input).toEqual({ ...makeFakePhoneCall(), id: '' })
  })
})
