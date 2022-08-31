import { PhoneCall } from "../../domain/entities";
import { ListPhoneCallsUseCase } from "../../domain/useCases";
import { ListPhoneCallsRepository } from "../repositories";

export class ListPhoneCallsService implements ListPhoneCallsUseCase {
  constructor(private readonly repo: ListPhoneCallsRepository) { }
  async list(): Promise<PhoneCall[]> {
    return await this.repo.list()
  }
}
