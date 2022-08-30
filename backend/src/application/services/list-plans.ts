import { PhonePlan } from "../../domain/entities";
import { ListPhonePlansUseCase } from "../../domain/useCases";
import { ListPhonePlansRepository } from "../repositories/list-phone-plans";

export class ListPhonePlansService implements ListPhonePlansUseCase {
  constructor(private readonly listPhonePlansRepo: ListPhonePlansRepository) { }

  async list(): Promise<PhonePlan[]> {
    return await this.listPhonePlansRepo.list()
  }
}
