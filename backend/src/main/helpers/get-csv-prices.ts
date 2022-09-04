import { readFileSync } from 'fs'
import { PhoneCall } from "../../domain/entities";

type PhoneCallInput = Omit<PhoneCall, 'id'>

export const getCsvPrices = (location: string): PhoneCallInput[] => {
  const csvBuf = readFileSync(location)
  const csvData = String(csvBuf)
  const rows = csvData.slice(csvData.indexOf("\n") + 1).split("\n");

  let prices: PhoneCallInput[] = []

  for (const row of rows) {
    const [originDDD, destinationDDD, priceStr] = row.split(',')
    const pricePerMinute = Number(priceStr)

    prices.push({
      originDDD,
      destinationDDD,
      pricePerMinute
    })
  }

  prices.pop()
  return prices
}
