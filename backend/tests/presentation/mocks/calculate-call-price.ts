import { CalculateCallPriceUseCase } from "../../../src/domain/useCases"

export class CalculateCallPriceServiceMock implements CalculateCallPriceUseCase {
  output = { priceWithPlan: 4.2, priceWithoutPlan: 20 }
  async calculate(input: CalculateCallPriceUseCase.Props): Promise<CalculateCallPriceUseCase.Result> {
    return this.output
  }
}


