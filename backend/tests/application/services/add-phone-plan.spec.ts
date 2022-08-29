type PhonePlan = {
  id: string
  durationInMinutes: number
  tax: number
}

interface AddPhonePlanRepository {
  add(newPlan: PhonePlan): Promise<PhonePlan>
}

interface AddPhonePlanUseCase {
  add(newPlan: PhonePlan): Promise<PhonePlan>
}

class AddPhonePlanRepositoryMock implements AddPhonePlanRepository {
  input = {}
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    this.input = newPlan
    return newPlan
  }
}

class AddPhonePlanService implements AddPhonePlanUseCase {
  constructor(private readonly addPhonePlanRepo: AddPhonePlanRepository) { }

  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    return await this.addPhonePlanRepo.add(newPlan)
  }
}

type SutTypes = {
  repo: AddPhonePlanRepositoryMock,
  sut: AddPhonePlanService
}

const makeSut = (): SutTypes => {
  const repo = new AddPhonePlanRepositoryMock()
  const sut = new AddPhonePlanService(repo)

  return {
    sut,
    repo
  }
}

const makeFakePhonePlan = (): PhonePlan => ({
  id: 'any_phone_plan_id',
  tax: 0.1,
  durationInMinutes: 30
})

describe('add-phone-plan-service', () => {
  it('should call repository with right data', async () => {
    const { sut, repo } = makeSut()

    await sut.add(makeFakePhonePlan())

    expect(repo.input).toEqual(makeFakePhonePlan())
  })
})
