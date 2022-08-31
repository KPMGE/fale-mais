import { Validator } from "../../../presentation/protocols";
import { RequiredFieldValidator } from "../../../validation/validators/required-field";
import { ValidationComposite } from "../../../validation/validators/validation-composite";

export const makeAddPhoneCallValidation = (): Validator => {
  let validators = []
  validators.push(new RequiredFieldValidator('destinationDDD'))
  validators.push(new RequiredFieldValidator('originDDD'))
  validators.push(new RequiredFieldValidator('pricePerMinute'))
  const composite = new ValidationComposite(validators)
  return composite
}
