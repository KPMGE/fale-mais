import { AddPhoneCallService } from "../../../application/services";
import { UuidGenerator } from "../../../infrastructure/providers";
import { InMemoryPhoneCallRepository } from "../../../infrastructure/repositories/in-memory";
import { AddPhoneCallController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";
import { makeAddPhoneCallValidation } from "../validation";

export const makeAddPhoneCallController = (): Controller => {
  const repo = new InMemoryPhoneCallRepository()
  const idGenerator = new UuidGenerator()
  const service = new AddPhoneCallService(repo, idGenerator, repo)
  const controller = new AddPhoneCallController(service, makeAddPhoneCallValidation())
  return controller
}
