import { getRepository } from 'typeorm';
import { Candidate } from '../models/candidate/CandidateEntity';

// Returns candidates sorted after number of criterias matching param
const selectSortedCandidatesBycriterias = async (criteriaIds: string[]) => {
    return await getRepository(Candidate)
        .createQueryBuilder('candidate')
        .leftJoinAndSelect(
            'candidate.criterias',
            'criteria',
            'criteria.id IN (:...criteriaIds)',
            { criteriaIds }
        )
        .orderBy('criteria', 'DESC')
        .getMany();
};

const selectCandidateById = async (id: number) => {
    return await getRepository(Candidate)
        .createQueryBuilder('candidate')
        .where('candidate.id = :id', { id })
        .getOne();
};

const insertCandidates = async (candidates: Candidate[]) => {
    return await getRepository(Candidate)
        .createQueryBuilder()
        .insert()
        .into(Candidate)
        .values(candidates)
        .execute();
};

// Replace with all encompassing update function
const addCriteria = async (candidateID: number, criteriaID: number) => {
    return await getRepository(Candidate)
        .createQueryBuilder()
        .relation(Candidate, 'criterias')
        .of(candidateID)
        .add(criteriaID);
};

export const candidateService = {
    selectSortedCandidatesBycriterias,
    selectCandidateById,
    insertCandidates,
    addCriteria,
};
