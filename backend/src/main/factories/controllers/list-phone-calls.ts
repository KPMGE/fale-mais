import { ListPhoneCallsService } from "../../../application/services";
import { InMemoryPhoneCallRepository } from "../../../infrastructure/repositories/in-memory";
import { ListPhonePlansController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";

export const makeListPhoneCallsController = (): Controller => {
  const repo = new InMemoryPhoneCallRepository()
  const service = new ListPhoneCallsService(repo)
  const controller = new ListPhonePlansController(service)
  return controller
}
