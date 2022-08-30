import { IdGenerator } from "../../application/providers";
import { v4 as uuid } from 'uuid'

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuid()
  }
}
