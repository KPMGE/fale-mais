import { PhoneCallNotFoundError, PhonePlanNotFoundError } from "../../domain/erros"
import { CalculateCallPriceUseCase } from "../../domain/useCases"
import { badRequest, ok, serverError } from "../helpers"
import { Controller, HttpResponse, Validator } from "../protocols"

export class CalculateCallPriceController implements Controller<CalculateCallPriceUseCase.Props> {
  constructor(
    private readonly service: CalculateCallPriceUseCase,
    private readonly validator: Validator
  ) { }

  async handle(req: CalculateCallPriceUseCase.Props): Promise<HttpResponse> {
    const err = this.validator.validate(req)
    if (err) return badRequest(err)

    try {
      const result = await this.service.calculate(req)
      return ok(result)
    } catch (error) {
      if (error instanceof PhoneCallNotFoundError || error instanceof PhonePlanNotFoundError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}

