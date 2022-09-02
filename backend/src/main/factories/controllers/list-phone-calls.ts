import { ListPhoneCallsService } from "../../../application/services";
import { InMemoryPhoneCallRepository } from "../../../infrastructure/repositories/in-memory";
import { ListPhoneCallsController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";

export const makeListPhoneCallsController = (): Controller => {
  const repo = new InMemoryPhoneCallRepository()
  const service = new ListPhoneCallsService(repo)
  const controller = new ListPhoneCallsController(service)
  return controller
}
