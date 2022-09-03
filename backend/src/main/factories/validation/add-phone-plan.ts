import { Validator } from "../../../presentation/protocols";
import { RequiredFieldValidator } from "../../../validation/validators/required-field";
import { ValidationComposite } from "../../../validation/validators/validation-composite";

export const makeAddPhonePlanValidation = (): Validator => {
  let validators: Validator[] = []

  validators.push(new RequiredFieldValidator('durationInMinutes'))
  validators.push(new RequiredFieldValidator('tax'))
  validators.push(new RequiredFieldValidator('name'))

  const composite = new ValidationComposite(validators)
  return composite
}
