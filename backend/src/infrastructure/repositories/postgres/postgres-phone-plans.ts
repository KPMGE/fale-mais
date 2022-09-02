import { PhonePlan } from "../../../domain/entities";
import { pool } from "./helper";
import {
  AddPhonePlanRepository,
  GetPhonePlanByDurationRepository,
  GetPhonePlanByIdRepository,
  ListPhonePlansRepository
} from "../../../application/repositories";

export class PostgresPhonePlanRepository implements AddPhonePlanRepository,
  GetPhonePlanByDurationRepository, GetPhonePlanByIdRepository, ListPhonePlansRepository {

  private map(planFromDb: any): PhonePlan {
    return {
      tax: planFromDb.tax,
      id: planFromDb.id,
      durationInMinutes: planFromDb.duration_in_minutes
    }
  }

  private mapCollection(plansFromDb: any[]): PhonePlan[] {
    return plansFromDb.map(plan => this.map(plan))
  }

  async add(phonePlan: PhonePlan): Promise<PhonePlan> {
    const { id, durationInMinutes, tax } = phonePlan
    await pool.query('INSERT INTO phone_plans VALUES($1, $2, $3)', [id, durationInMinutes, tax])
    return phonePlan
  }

  async getById(planId: string): Promise<PhonePlan> {
    const result = await pool.query('SELECT * FROM phone_plans WHERE id=$1', [planId])
    const planFromDb = result.rows[0]
    return this.map(planFromDb)
  }

  async getByDuration(duration: number): Promise<PhonePlan> {
    const result = await pool.query('SELECT * FROM phone_plans WHERE duration_in_minutes=$1', [duration])
    const planFromDb = result.rows[0]
    return this.map(planFromDb)
  }

  async list(): Promise<PhonePlan[]> {
    const result = await pool.query('SELECT * FROM phone_plans')
    const allPlans = result.rows
    return this.mapCollection(allPlans)
  }
}
