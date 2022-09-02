import { InvalidAmountMinutesError } from "../../presentation/errors";
import { Validator } from "../../presentation/protocols";

export class AmountMinutesValidation implements Validator {
  constructor(private readonly fieldName: string) { }

  validate(data: any): Error {
    if (data[this.fieldName] <= 0) return new InvalidAmountMinutesError()
  }
}
