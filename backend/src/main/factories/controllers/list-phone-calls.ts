import { ListPhoneCallsService } from "../../../application/services";
import { PostgresPhoneCallRepository } from "../../../infrastructure/repositories/postgres";
import { ListPhoneCallsController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";

export const makeListPhoneCallsController = (): Controller => {
  const repo = new PostgresPhoneCallRepository()
  const service = new ListPhoneCallsService(repo)
  const controller = new ListPhoneCallsController(service)
  return controller
}
