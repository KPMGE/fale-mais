import { GetPhoneCallByDDDRepository, ListPhoneCallsRepository } from "../../../application/repositories";
import { AddPhoneCallRepository } from "../../../application/repositories/add-phone-call";
import { PhoneCall } from "../../../domain/entities";
import { pool } from "./helper";

export class PostgresPhoneCallRepository implements AddPhoneCallRepository, ListPhoneCallsRepository, GetPhoneCallByDDDRepository {
  private map(callPromDb: any): PhoneCall {
    return {
      id: callPromDb.id,
      pricePerMinute: callPromDb.price_per_minute,
      destinationDDD: callPromDb.destination_ddd,
      originDDD: callPromDb.origin_ddd
    }
  }

  private mapCollection(callsFromDb: any[]): PhoneCall[] {
    return callsFromDb.map(call => this.map(call))
  }

  async add(newCall: PhoneCall): Promise<PhoneCall> {
    const { id, originDDD, destinationDDD, pricePerMinute } = newCall
    await pool.query('INSERT INTO phone_calls VALUES($1, $2, $3, $4)', [id, originDDD, destinationDDD, pricePerMinute])
    return newCall
  }

  async list(): Promise<PhoneCall[]> {
    const result = await pool.query('SELECT * FROM phone_calls')
    const phoneCalls = result.rows
    return this.mapCollection(phoneCalls)
  }

  async getByDDD(originDDD: string, destinationDDD: string): Promise<PhoneCall> {
    const result = await pool.query('SELECT * FROM phone_calls WHERE origin_ddd=$1 AND destination_ddd=$2', [originDDD, destinationDDD])
    const phoneCall = result.rows[0]
    return this.map(phoneCall)
  }
}
