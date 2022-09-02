import { ListPhonePlansService } from "../../../application/services/list-plans";
import { PostgresPhonePlanRepository } from "../../../infrastructure/repositories/postgres";
import { ListPhonePlansController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";

export const makeListPhonePlansController = (): Controller => {
  const repo = new PostgresPhonePlanRepository()
  const service = new ListPhonePlansService(repo)
  const controller = new ListPhonePlansController(service)
  return controller
}
