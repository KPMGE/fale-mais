import { AddPhonePlanService } from "../../../application/services/add-plan";
import { InMemoryPhonePlanRepository } from "../../../infrastructure/repositories/in-memory/in-memory-phone-plan";
import { AddPhonePlanController } from "../../../presentation/controllers/add-phone-plan";
import { Controller } from "../../../presentation/protocols";
import { makeAddPhonePlanValidation } from "../validation";

export const makeAddPhonePlanController = (): Controller => {
  const repo = new InMemoryPhonePlanRepository()
  const service = new AddPhonePlanService(repo, repo)
  const controller = new AddPhonePlanController(service, makeAddPhonePlanValidation())
  return controller
}
