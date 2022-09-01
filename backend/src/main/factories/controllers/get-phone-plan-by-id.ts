import { GetPhonePlanByIdService } from "../../../application/services";
import { InMemoryPhonePlanRepository } from "../../../infrastructure/repositories/in-memory";
import { GetPhonePlanByIdController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";

export const makeGetPhonePlanByIdController = (): Controller => {
  const repo = new InMemoryPhonePlanRepository()
  const service = new GetPhonePlanByIdService(repo)
  const controller = new GetPhonePlanByIdController(service)
  return controller
} 
