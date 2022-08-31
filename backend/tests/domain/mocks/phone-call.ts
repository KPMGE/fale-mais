import { PhoneCall } from "../../../src/domain/entities";

export const makeFakePhoneCall = (): Omit<PhoneCall, 'id'> => ({
  destinationDDD: '000',
  originDDD: '000',
  pricePerMinute: 2.2,
})
