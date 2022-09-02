import { Validator } from "../../../presentation/protocols";
import {
  AmountMinutesValidation,
  RequiredFieldValidator,
  ValidationComposite
}
  from "../../../validation/validators";

export const makeCalculateCallPriceValidation = (): Validator => {
  let validators = []

  validators.push(new RequiredFieldValidator('phonePlanId'))
  validators.push(new RequiredFieldValidator('amountMinutes'))
  validators.push(new RequiredFieldValidator('originDDD'))
  validators.push(new RequiredFieldValidator('destinationDDD'))
  validators.push(new AmountMinutesValidation('amountMinutes'))

  const composite = new ValidationComposite(validators)
  return composite
}
