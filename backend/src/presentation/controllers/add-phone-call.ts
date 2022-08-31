import { DuplicatePhoneCallError } from "../../domain/erros"
import { InvalidDDDError } from "../../domain/erros/invalid-ddd"
import { AddPhoneCallUseCase } from "../../domain/useCases"
import { badRequest, ok, serverError } from "../helpers"
import { Controller, HttpResponse, Validator } from "../protocols"

export class AddPhoneCallController implements Controller<AddPhoneCallUseCase.Props> {
  constructor(
    private readonly service: AddPhoneCallUseCase,
    private readonly validator: Validator
  ) { }

  async handle(req: AddPhoneCallUseCase.Props): Promise<HttpResponse> {
    const err = this.validator.validate(req)
    if (err) return badRequest(err)

    try {
      const addedPhoneCall = await this.service.add(req)
      return ok(addedPhoneCall)
    } catch (error) {
      if (error instanceof InvalidDDDError || error instanceof DuplicatePhoneCallError) return badRequest(error)
      return serverError(error)
    }
  }
}
