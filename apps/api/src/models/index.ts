import { Candidate } from './candidate/CandidateEntity';
import { Citizen } from './citizen/CitizenEntity';
import { Consent } from './consent/ConsentEntity';
import { Criteria } from './criteria/CriteriaEntity';
import { CriteriaCategory } from './criteriaCategory/CriteriaCategoryEntity';
import { Employee } from './employee/EmployeeEntity';
import { Insight } from './insight/InsightEntity';
import { InsightProject } from './insightProject/InsightProjectEntity';
import { Message } from './message/MessageEntity';
import { User } from './user/UserEntity';

const models = [
    Candidate,
    Consent,
    Criteria,
    CriteriaCategory,
    Insight,
    InsightProject,
    Message,
    Citizen,
    Employee,
    User
];

export default models;
