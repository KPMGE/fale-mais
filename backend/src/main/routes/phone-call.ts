import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import {
  makeAddPhoneCallController,
  makeCalculateCallPriceController,
  makeListPhoneCallsController
} from "../factories/controllers";

export default (router: Router) => {
  router.post("/phone-call", expressRouteAdapter(makeAddPhoneCallController()))
  router.get("/phone-call/price", expressRouteAdapter(makeCalculateCallPriceController()))
  router.get("/phone-call", expressRouteAdapter(makeListPhoneCallsController()))
}
