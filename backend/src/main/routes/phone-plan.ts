import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import {
  makeAddPhonePlanController,
  makeGetPhonePlanByIdController,
  makeListPhonePlansController
} from "../factories/controllers";

export default (router: Router) => {
  router.post("/phone-plan", expressRouteAdapter(makeAddPhonePlanController()))
  router.get("/phone-plan/:planId", expressRouteAdapter(makeGetPhonePlanByIdController()))
  router.get("/phone-plan", expressRouteAdapter(makeListPhonePlansController()))
}
