import { IdGenerator } from "../../../src/application/providers";

export class IdGeneratorMock implements IdGenerator {
  output = "id_from_generator"
  generate(): string {
    return this.output
  }
}
