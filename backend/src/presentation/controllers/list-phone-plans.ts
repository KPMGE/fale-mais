import { ListPhonePlansUseCase } from "../../domain/useCases"
import { ok, serverError } from "../helpers"
import { Controller, HttpResponse } from "../protocols"

export class ListPhonePlansController implements Controller {
  constructor(private readonly service: ListPhonePlansUseCase) { }
  async handle(): Promise<HttpResponse> {
    try {
      const plans = await this.service.list()
      return ok(plans)
    } catch (error) {
      return serverError(error)
    }
  }
}
