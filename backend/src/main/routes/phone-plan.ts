import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeAddPhonePlanController } from "../factories/controllers";

export default (router: Router) => {
  router.post("/phone-plan", expressRouteAdapter(makeAddPhonePlanController()))
}
