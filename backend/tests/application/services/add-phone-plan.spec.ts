type PhonePlan = {
  id: string
  durationInMinutes: number
  tax: number
}

interface AddPhonePlanRepository {
  add(newPlan: PhonePlan): Promise<PhonePlan>
}

interface GetPhonePlanByDurationRepository {
  getByDuration(duration: number): Promise<PhonePlan>
}

interface AddPhonePlanUseCase {
  add(newPlan: PhonePlan): Promise<PhonePlan>
}

class AddPhonePlanRepositoryMock implements AddPhonePlanRepository {
  input = {}
  callsCount = 0
  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    this.input = newPlan
    this.callsCount++
    return newPlan
  }
}

class GetPhonePlanByDurationRepositoryMock implements GetPhonePlanByDurationRepository {
  input = 0
  output = null
  async getByDuration(duration: number): Promise<PhonePlan> {
    this.input = duration
    return this.output
  }
}

class AddPhonePlanService implements AddPhonePlanUseCase {
  constructor(
    private readonly addPhonePlanRepo: AddPhonePlanRepository,
    private readonly getPlanByDurationRepo: GetPhonePlanByDurationRepository,
  ) { }

  async add(newPlan: PhonePlan): Promise<PhonePlan> {
    const plan = await this.getPlanByDurationRepo.getByDuration(newPlan.durationInMinutes)
    if (plan) throw new InvalidPlanDuration()
    const addedPlan = await this.addPhonePlanRepo.add(newPlan)
    return addedPlan
  }
}

type SutTypes = {
  addRepo: AddPhonePlanRepositoryMock
  getByDurationRepo: GetPhonePlanByDurationRepositoryMock
  sut: AddPhonePlanService
}

const makeSut = (): SutTypes => {
  const addRepo = new AddPhonePlanRepositoryMock()
  const getByDurationRepo = new GetPhonePlanByDurationRepositoryMock()
  const sut = new AddPhonePlanService(addRepo, getByDurationRepo)

  return {
    sut,
    addRepo,
    getByDurationRepo
  }
}

const makeFakePhonePlan = (): PhonePlan => ({
  id: 'any_phone_plan_id',
  tax: 0.1,
  durationInMinutes: 30
})

class InvalidPlanDuration extends Error {
  constructor() {
    super('InvalidPlanDuration ')
    this.message = 'There is a plan with this duration already!'
    this.name = 'InvalidPlanDuration'
  }
}

describe('add-phone-plan-service', () => {
  it('should call repository with right data', async () => {
    const { sut, addRepo } = makeSut()

    await sut.add(makeFakePhonePlan())

    expect(addRepo.input).toEqual(makeFakePhonePlan())
  })

  it('should call repository only once', async () => {
    const { sut, addRepo } = makeSut()

    await sut.add(makeFakePhonePlan())

    expect(addRepo.callsCount).toBe(1)
  })

  it('should throw error if there is a plan with the same duration already', async () => {
    const { sut, getByDurationRepo } = makeSut()

    // there is a plan with the same duration already
    getByDurationRepo.output = makeFakePhonePlan()

    const promise = sut.add(makeFakePhonePlan())

    await expect(promise).rejects.toThrowError(new InvalidPlanDuration())
  })
})
