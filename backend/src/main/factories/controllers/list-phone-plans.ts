import { ListPhonePlansService } from "../../../application/services/list-plans";
import { InMemoryPhonePlanRepository } from "../../../infrastructure/repositories/in-memory/in-memory-phone-plan";
import { ListPhonePlansController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";

export const makeListPhonePlansController = (): Controller => {
  const repo = new InMemoryPhonePlanRepository()
  const service = new ListPhonePlansService(repo)
  const controller = new ListPhonePlansController(service)
  return controller
}
