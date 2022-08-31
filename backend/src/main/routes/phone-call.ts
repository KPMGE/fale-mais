import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeAddPhoneCallController } from "../factories/controllers";

export default (router: Router) => {
  router.post("/phone-call", expressRouteAdapter(makeAddPhoneCallController()))
}
