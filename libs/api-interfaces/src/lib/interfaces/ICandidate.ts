import { digitalSkills } from "../types/digitalSkills";
import { education } from "../types/education";

export interface ICandidate {
    id: number;
    name: string;
    age: number;
    motherTounge: string;
    education: education
    benefits?: string;
    handicap?: string;
    assistiveTechnology?: string;
    digitalSkills: digitalSkills;
    employed: boolean;
    industry?: string;
}