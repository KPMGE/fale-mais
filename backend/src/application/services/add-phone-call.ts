import { PhoneCall } from "../../domain/entities";
import { InvalidDDDError } from "../../domain/erros/invalid-ddd";
import { AddPhoneCallUseCase } from "../../domain/useCases";
import { IdGenerator } from "../providers";
import { AddPhoneCallRepository } from "../repositories/add-phone-call";

export class AddPhoneCallService implements AddPhoneCallUseCase {
  constructor(
    private readonly repo: AddPhoneCallRepository,
    private readonly idGenerator: IdGenerator
  ) { }


  private hasOnlyNumbers(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }

  async add({ originDDD, destinationDDD, pricePerMinute }: AddPhoneCallUseCase.Props): Promise<PhoneCall> {

    if (originDDD.length != 3) throw new InvalidDDDError(originDDD)
    if (destinationDDD.length != 3) throw new InvalidDDDError(destinationDDD)

    if (!this.hasOnlyNumbers(originDDD)) throw new InvalidDDDError(originDDD)
    if (!this.hasOnlyNumbers(destinationDDD)) throw new InvalidDDDError(destinationDDD)


    const newCallWithId = {
      id: this.idGenerator.generate(),
      destinationDDD,
      originDDD,
      pricePerMinute
    }

    const addedCall = await this.repo.add(newCallWithId)
    return addedCall
  }
}
