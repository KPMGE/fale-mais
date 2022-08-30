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

describe('add-phone-call-service', () => {
  it('should call repository with right data', async () => {
    const addRepoSpy = new AddPhoneCallRepositorySpy()
    const sut = new AddPhoneCallService(addRepoSpy)

    const fakePhoneCall = {
      origin: '011',
      destination: '017',
      pricePerMinue: 1.90
    }

    await sut.add(fakePhoneCall)

    expect(addRepoSpy.input).toEqual({ ...fakePhoneCall, id: '' })
  })
})
