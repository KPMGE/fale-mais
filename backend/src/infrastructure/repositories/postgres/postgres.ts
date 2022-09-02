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

  async add(phonePlan: PhonePlan): Promise<PhonePlan> {
    const { id, durationInMinutes, tax } = phonePlan
    await pool.query('INSERT INTO phone_plans VALUES($1, $2, $3)', [id, durationInMinutes, tax])
    return phonePlan
  }

  async getById(planId: string): Promise<PhonePlan> {
    const result = await pool.query('SELECT * FROM phone_plans WHERE id=$1', [planId])
    const plan = result.rows[0]
    return plan
  }

  async getByDuration(duration: number): Promise<PhonePlan> {
    const result = await pool.query('SELECT * FROM phone_plans WHERE durationInMinutes=$1', [duration])
    const plan = result.rows[0]
    return plan
  }

  async list(): Promise<PhonePlan[]> {
    const result = await pool.query('SELECT * FROM phone_plans')
    const allPlans = result.rows
    return allPlans
  }
}
