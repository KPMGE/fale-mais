import { PhonePlanNotFoundError } from "../../domain/erros"
import { GetPhonePlanByIdUseCase } from "../../domain/useCases"
import { badRequest, ok, serverError } from "../helpers"
import { Controller, HttpResponse } from "../protocols"

export class GetPhonePlanByIdController implements Controller {
  constructor(private readonly service: GetPhonePlanByIdUseCase) { }

  async handle(req: any): Promise<HttpResponse> {
    try {
      const foundPlan = await this.service.getById(req.planId)
      return ok(foundPlan)
    } catch (error) {
      if (error instanceof PhonePlanNotFoundError) return badRequest(error)
      return serverError(error)
    }
  }
}
