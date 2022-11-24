import { Coach } from "./coach.entity";

export const COACH_REPOSITORY = 'CoachRepository';

export interface CoachRepository {
  create(coach: Coach): Promise<Coach>;
  update(coach: Coach): Promise<Coach>;
  delete(coachId: number): Promise<boolean>;
  getById(id: number): Promise<Coach>;
  getBySalary(salary: Number): Promise<Coach>;
  getByCard(card: string): Promise<Coach>;
}