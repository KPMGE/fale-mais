import { Validator } from "../../../src/presentation/protocols"

export class ValidatorMock implements Validator {
  output = null
  validate(data: any): Error {
    return this.output
  }
}
