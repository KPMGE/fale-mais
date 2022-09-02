import { GetPhonePlanByIdService } from "../../../application/services";
import { PostgresPhonePlanRepository } from "../../../infrastructure/repositories/postgres";
import { GetPhonePlanByIdController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";

export const makeGetPhonePlanByIdController = (): Controller => {
  const repo = new PostgresPhonePlanRepository()
  const service = new GetPhonePlanByIdService(repo)
  const controller = new GetPhonePlanByIdController(service)
  return controller
} 
