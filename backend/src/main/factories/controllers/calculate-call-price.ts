import { CalculateCallPriceService } from "../../../application/services";
import { PostgresPhoneCallRepository, PostgresPhonePlanRepository } from "../../../infrastructure/repositories/postgres";
import { CalculateCallPriceController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";
import { makeCalculateCallPriceValidation } from "../validation";

export const makeCalculateCallPriceController = (): Controller => {
  const planRepo = new PostgresPhonePlanRepository()
  const callRepo = new PostgresPhoneCallRepository()
  const service = new CalculateCallPriceService(planRepo, callRepo)
  const controller = new CalculateCallPriceController(service, makeCalculateCallPriceValidation())
  return controller
}
