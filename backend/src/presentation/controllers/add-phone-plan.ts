import { PhonePlan } from "../../domain/entities"
import { DuplicatePlanDurationError, InvalidPlanDurationError } from "../../domain/erros"
import { AddPhonePlanUseCase } from "../../domain/useCases"
import { badRequest, ok, serverError } from "../helpers"
import { Controller, HttpResponse, Validator } from "../protocols"

export class AddPhonePlanController implements Controller<PhonePlan> {
  constructor(
    private readonly service: AddPhonePlanUseCase,
    private readonly validator: Validator
  ) { }

  async handle(req: PhonePlan): Promise<HttpResponse> {
    const error = this.validator.validate(req)
    if (error) return badRequest(error)

    try {
      const addedPhonePlan = await this.service.add(req)
      return ok(addedPhonePlan)
    } catch (error) {
      if (error instanceof InvalidPlanDurationError || error instanceof DuplicatePlanDurationError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
