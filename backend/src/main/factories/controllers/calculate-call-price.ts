import { CalculateCallPriceService } from "../../../application/services";
import {
  InMemoryPhoneCallRepository,
  InMemoryPhonePlanRepository
} from "../../../infrastructure/repositories/in-memory";
import { CalculateCallPriceController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";
import { makeCalculateCallPriceValidation } from "../validation";

export const makeCalculateCallPriceController = (): Controller => {
  const planRepo = new InMemoryPhonePlanRepository()
  const callRepo = new InMemoryPhoneCallRepository()
  const service = new CalculateCallPriceService(planRepo, callRepo)
  const controller = new CalculateCallPriceController(service, makeCalculateCallPriceValidation())
  return controller
}
