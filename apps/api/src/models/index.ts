import { Candidate } from './candidate/CandidateEntity';
import { Consent } from './consent/ConsentEntity';
import { Criteria } from './criteria/CriteriaEntity';
import { CriteriaCategory } from './criteriaCategory/CriteriaCategoryEntity';
import { Insight } from './insight/InsightEntity';
import { InsightProject } from './insightProject/InsightProjectEntity';
import { User } from './user/UserEntity';

const models = [Candidate, Consent, Criteria, CriteriaCategory, Insight, InsightProject, User];

export default models;
