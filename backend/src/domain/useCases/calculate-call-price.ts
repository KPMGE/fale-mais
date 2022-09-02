export interface CalculateCallPriceUseCase {
  calculate(input: CalculateCallPriceUseCase.Props): Promise<CalculateCallPriceUseCase.Result>
}

export namespace CalculateCallPriceUseCase {
  export type Props = {
    phonePlanId: string
    amountMinutes: number
    originDDD: string
    destinationDDD: string
  }
  export type Result = {
    priceWithPlan: number
    priceWithoutPlan: number
  }
}
