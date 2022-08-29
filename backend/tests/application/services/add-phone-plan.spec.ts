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

describe('add-phone-plan-service', () => {
  it('should call repository with right data', async () => {
    const repo = new AddPhonePlanRepositoryMock()
    const sut = new AddPhonePlanService(repo)

    const fakePlan: PhonePlan = {
      id: 'any_phone_plan_id',
      tax: 0.1,
      durationInMinutes: 30
    }

    await sut.add(fakePlan)

    expect(repo.input).toEqual(fakePlan)
  })
})
