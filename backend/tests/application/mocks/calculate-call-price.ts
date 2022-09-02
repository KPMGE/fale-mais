import { CalculateCallPriceUseCase } from "../../../src/domain/useCases";

export const makefakeCalculatePriceInput = (): CalculateCallPriceUseCase.Props => ({
  phonePlanId: 'any_phone_plan_id',
  originDDD: 'any_origin_ddd',
  destinationDDD: 'any_destination_ddd',
  amountMinutes: 60
})


