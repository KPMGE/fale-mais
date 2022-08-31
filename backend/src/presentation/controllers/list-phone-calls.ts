import { ListPhoneCallsUseCase } from "../../domain/useCases"
import { ok, serverError } from "../helpers"
import { Controller, HttpResponse } from "../protocols"

export class ListPhoneCallsController implements Controller {
  constructor(private readonly service: ListPhoneCallsUseCase) { }
  async handle(req: any): Promise<HttpResponse> {
    try {
      const phoneCalls = await this.service.list()
      return ok(phoneCalls)
    } catch (error) {
      return serverError(error)
    }
  }
}
